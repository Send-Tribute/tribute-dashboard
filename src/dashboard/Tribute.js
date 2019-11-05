require('babel-polyfill');
const ethers = require('ethers');
const { parseUnits, bigNumberify, formatUnits } = ethers.utils;

class Tribute {
  constructor(DAIContract, rDAIContract, userAddress) {
    this.DAIContract = DAIContract;
    this.DAI_DECIMALS = null;
    this.rDAIContract = rDAIContract;
    this.rDAI_DECIMALS = null;
    this.SELF_HAT_ID = null
    this.userAddress = userAddress.toLowerCase();
    this.PROPORTION_BASE = bigNumberify('0xFFFFFFFF');
  }

  async get_DAI_DECIMALS() {
    if(this.DAI_DECIMALS === null) {
      this.DAI_DECIMALS = await this.DAIContract.decimals();
    }
    return this.DAI_DECIMALS;
  }

  async get_rDAI_DECIMALS() {
    if(this.rDAI_DECIMALS === null) {
      this.rDAI_DECIMALS = await this.rDAIContract.decimals();
    }
    return this.rDAI_DECIMALS;
  }

  async get_SELF_HAT_ID() {
    if(this.SELF_HAT_ID === null) {
      this.SELF_HAT_ID = await this.rDAIContract.SELF_HAT_ID;
    }
    return this.SELF_HAT_ID;
  }

  _calculateProportionWholeNumbers(proportions, balance_BN) {
    //NOTE: All math is done in expanded notion in base 10.
    //This is because there are no decimals

    return proportions.map(portion => {
      //obtain portion whole number
      let portion_BN = bigNumberify(portion).mul(balance_BN)

      //NOTE: This reduction loses precision 
      //Take Expanded Form and Reduce
      portion_BN = portion_BN.div(this.PROPORTION_BASE)
      console.log("portion whole: " + portion_BN.toString())
      return portion_BN
    });
  }

  _removeAddressesWithZeroFlow(recipientMap) {
    for (let [address, portion_BN] of Object.entries(recipientMap)) {
      if (portion_BN.eq(ethers.constants.Zero)) {
        delete recipientMap[address];
      }
    }
    return recipientMap;
  }

  async generate(amountToTransferString) {

    const DAI_DECIMALS = await this.get_DAI_DECIMALS();

    //decimals length cannot be bigger than allowed DAI_DECIMALS
    let decimalSize = amountToTransferString.split('.')[1].length
    if (decimalSize > DAI_DECIMALS) throw "Underflow Error"

    // approve DAI
    const amountToTransfer_BN = parseUnits(amountToTransferString, DAI_DECIMALS)
    console.log("amount to transfer: " + amountToTransfer_BN.toString())

    await this.DAIContract.approve(
      this.rDAIContract.address,
      amountToTransfer_BN
    );

    let balance_BN = await this.rDAIContract.balanceOf(this.userAddress);
    console.log("existing balance: " + balance_BN.toString())

    const currentHat = await this.rDAIContract.getHatByAddress(
      this.userAddress
    );

    const { recipients, proportions } = currentHat;

    let portionWholeNum = this._calculateProportionWholeNumbers(proportions, balance_BN);

    // convert to object mapping
    let recipientMap = {};
    recipients.forEach(
      (address, i) => (recipientMap[address.toLowerCase()] = portionWholeNum[i])
    );

    let userBal = recipientMap[this.userAddress]
      ? recipientMap[this.userAddress]
      : balance_BN;

    //add the amountToTransfer to existing balance in the proportion form
    recipientMap[this.userAddress] = userBal.add(amountToTransfer_BN);
    recipientMap = this._removeAddressesWithZeroFlow(recipientMap)

    console.log("new balance: " + recipientMap[this.userAddress].toString())

    //I HAVE A NEW BALANCE BUT IT'S TOOOO LONG it needs to fit into uint32
    let newRecipients = Object.keys(recipientMap)
    let newProportions = Object.values(recipientMap).map(
      value => {
        let val = value;
        //14 allows 4 decimals of precision
        console.log("before reduction: " + val)

        //this can be a dynamic range, but must be smaller than the max proportion allowed
        //value should be truncated by an additional power of 10 it's larger
        let proportion = bigNumberify(this.PROPORTION_BASE)
        console.log("BASE: " + proportion)
        while(val.gt(proportion)) {
          val = val.div(bigNumberify(10).pow(1)) 
        }

        //let val = val.div(bigNumberify(10).pow(14))

        console.log("reduced: " + val.toNumber())
        return val.toNumber()
      }
    )

    console.log(newRecipients)
    console.log(newProportions)

    await this.rDAIContract.mintWithNewHat(
      amountToTransfer_BN,
      newRecipients,
      newProportions
    );
  }

  async disable() {
    await this.rDAIContract.redeemAll();
  }

  async getInfo(address) {
    const balance_BN = await this.rDAIContract.balanceOf(address);
    let unclaimedBalance_BN = await this.rDAIContract.interestPayableOf(
      address
    );

    // Check if the user has a hat
    const currentHat = await this.rDAIContract.getHatByAddress(
      address
    );

    console.log("current hat")
    console.log(currentHat)

    let { recipients, proportions } = currentHat;
    let unallocatedBalance;
    let portionWholeNum;

    //check if hat is empty
    if (recipients.length === 0) {
      unallocatedBalance = balance_BN;
    } else {
      // set all recepients to lower case to allow searching
      recipients = currentHat.recipients.map(r => r.toLowerCase());

      portionWholeNum = this._calculateProportionWholeNumbers(proportions, balance_BN);

      let userIdx = recipients.indexOf(address.toLowerCase());

      //check if user exists
      if (userIdx < 0) {
        unallocatedBalance = ethers.constants.Zero;
      } else {
        unallocatedBalance = portionWholeNum[userIdx];

        //remove user from portionWholeNum
        recipients.splice(userIdx, 1); // remove user from recipients
        portionWholeNum.splice(userIdx, 1); // remove user from the proportions
      }
    }

    const rDAI_DECIMALS = await this.get_rDAI_DECIMALS();

    return {
      allocations: {
        recipients: recipients.map(recipient =>
          ethers.utils.getAddress(recipient)
        ),
        proportions: portionWholeNum.map(portion =>
          formatUnits(portion, rDAI_DECIMALS)
        )
      },
      balance: formatUnits(balance_BN, rDAI_DECIMALS),
      unallocated_balance: formatUnits(unallocatedBalance, rDAI_DECIMALS),
      unclaimed_balance: formatUnits(unclaimedBalance_BN, rDAI_DECIMALS)
    };
  }

  async startFlow(recipientAddress, amount) {
    let amount_BN = bigNumberify(amount);

    const rDAI_DECIMALS = await this.get_rDAI_DECIMALS();

    let balance_BN = await this.rDAIContract.balanceOf(this.userAddress);

    const currentHat = await this.rDAIContract.getHatByAddress(
      this.userAddress
    );

    const { recipients, proportions } = currentHat;

    let portionWholeNum = this._calculateProportionWholeNumbers(proportions, balance_BN);

    //turn recipients and proportions into map
    // convert to object mapping
    let recipientMap = {};
    recipients.forEach(
      (address, i) => (recipientMap[address.toLowerCase()] = portionWholeNum[i])
    );

    //validate if hat !exist
    const SELF_HAT_ID = await this.get_SELF_HAT_ID();
    if (currentHat.hatID.eq(SELF_HAT_ID) || currentHat.hatID.isZero()) {
      //if balance < amount
      if (balance_BN.lt(amount_BN)) throw 'insuffient balance';
    }

    //validate if there are amounts left in user portion
    if (!(this.userAddress in recipientMap)) throw 'insufficient balance left';

    let userBal = recipientMap[this.userAddress]
      ? recipientMap[this.userAddress]
      : balance_BN;
    let recipientBal = recipientMap[recipientAddress.toLowerCase()]
      ? recipientMap[recipientAddress.toLowerCase()]
      : ethers.constants.Zero;
    let sum = userBal.add(recipientBal);

    if (sum.lt(amount_BN)) throw 'insufficent balance left';

    //We have enough to update, continue and update values

    //update values between user and recipient
    const amountNeeded = amount_BN.sub(recipientBal);
    userBal = userBal.sub(amountNeeded);
    recipientBal = recipientBal.add(amountNeeded);

    //set values
    recipientMap[this.userAddress] = userBal;
    recipientMap[recipientAddress.toLowerCase()] = recipientBal;
    recipientMap = this._removeAddressesWithZeroFlow(recipientMap); 

    let newRecipients = Object.keys(recipientMap)
    let newProportions = Object.values(recipientMap).map(value => this.reduce_BN(value))

    //update to new hat values
    await this.rDAIContract.createHat(
      newRecipients,
      newProportions,
      true
    );
  }

  async endFlow(addressToRemove) {
    const rDAI_DECIMALS = await this.get_rDAI_DECIMALS();

    let balance_BN = await this.rDAIContract.balanceOf(this.userAddress);

    const currentHat = await this.rDAIContract.getHatByAddress(
      this.userAddress
    );

    const { recipients, proportions } = currentHat;

    let portionWholeNum = this._calculateProportionWholeNumbers(proportions, balance_BN)

    //turn recipients and proportions into map
    // convert to object mapping
    let recipientMap = {};
    recipients.forEach(
      (address, i) => (recipientMap[address.toLowerCase()] = portionWholeNum[i])
    );

    // validate if hat !exist
    const SELF_HAT_ID = await this.get_SELF_HAT_ID();
    if (currentHat.hatID.eq(SELF_HAT_ID) || currentHat.hatID.isZero())
      throw 'No flows to end';

    // validate if there are amounts left in user portion
    if (!(addressToRemove.toLowerCase() in recipientMap))
      throw `address: ${addressToRemove} does not exist`;

    let userBal = recipientMap[this.userAddress]
      ? recipientMap[this.userAddress]
      : balance_BN;
    let recipientBal = recipientMap[addressToRemove.toLowerCase()]
      ? recipientMap[addressToRemove.toLowerCase()]
      : ethers.constants.Zero;
    let sum = userBal.add(recipientBal);

    //update and set values between user and recipient
    recipientMap[this.userAddress] = userBal.add(recipientBal);
    recipientMap[addressToRemove.toLowerCase()] = ethers.constants.Zero;
    recipientMap = this._removeAddressesWithZeroFlow(recipientMap);

    //update to new hat values
    await this.rDAIContract.createHat(
      Object.keys(recipientMap),
      Object.values(recipientMap),
      true
    );
  }

  async claimAmount(address) {
    //this cashes out all rDAI in both interest
    //and principal and sends it back to the user
    //NOTE: this amount is not added to the receiving user's hat, it shows up in their rDAIBalance
    await this.rDAIContract.payInterest(address);
  }
}

module.exports = Tribute;
