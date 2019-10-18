import 'babel-polyfill';
import { ethers } from 'ethers';
const { bigNumberify, toNumber, formatEther } = ethers.utils;

export default class Tribute {

  constructor(DAIContract, rDAIContract, userAddress) {
    this.DAIContract = DAIContract;
    this._DAI_Decimals;

    this.rDAIContract = rDAIContract;
    this._rDAI_Deciamls;
    this._rDAI_Proportion_Base
    this._rDAI_Self_Hat;

    this.userAddress = userAddress;
  }

  async fetch_DAI_Decimals() {
    if(!this._DAI_Decimals) {
      this._DAI_Decimals = await this.DAIContract.decimals();
    }
    return this._DAI_Decimals;
  }

  async fetch_rDAI_Decimals() {
    if(!this._rDAI_Decimals) {
      this._rDAI_Decimals = await this.rDAIContract.decimals();
    }
    return this._rDAI_Decimals;
  }

  async fetch_Self_Hat_Id() {
    if (!this._rDAI_Self_Hat) {
      this._rDAI_Self_Hat = await this.rDAIContract.SELF_HAT_ID;
    }
    return this._rDAI_Self_Hat;
  }

  async fetch_rDAI_Proportion_Base() {
    if(!this._rDAI_Proportion_Base) {
      this._rDAI_Proportion_Base = await this.rDAIContract.PROPORTION_BASE;
    }
    return this._rDAI_Proportion_Base;
  }

 async calculatePortionWholeNum(balance, proportions) {
    const PROPORTION_BASE = await fetch_rDAI_Proportion_Base();
    let portionWholeNum = proportions.map(portion => {
        return (portion / PROPORTION_BASE) * balance;
    });
   return portionWholeNum;
 }

  async getrDaiBalance() {
    const rDAIBalance_BN = await this.rDAIContract.balanceOf(this.userAddress);
    const decimals_rDAI = await this.fetch_rDAI_Decimals();;
    const balance = awarDAIBalance_BN.div(decimals_rDAI).toNumber();
    return balance;
  }

  async generate(amountToTribute) {
    const PROPORTION_BASE = await this.fetch_rDAI_Proportion_Base();
    const decimals_DAI = await this.fetch_DAI_Decimals();
    const decimals_rDAI = await this.fetch_rDAI_Decimals();;
    
    // approve DAI
    const amountToTribute_BN = bigNumberify(amountToTribute).mul(decimals_DAI);
    await this.DAIContract.approve(this.rDAIContract.address, amountToTribute_BN);

    const balance = getrDaiBalance();
    const currentHat = await this.rDAIContract.getHatByAddress(this.userAddress);
    const [receipents, proportions] = currentHat;

    // calculate proportions whole numbers
    let portionWholeNum = await calculatePortionWholeNum(balance, proportions);

    // convert to object mapping
    let recipientMap = {};
    receipents.forEach((address, i) => recipientMap[address] = portionWholeNum[i]);

    let userBal = recipientMap[this.userAddress] ? recipientMap[this.userAddress] : balance;

    recipientMap[this.userAddress] = userBal + amountToTribute;

    await this.rDAIContract.createHat(
        Object.keys(recipientMap),
        Object.values(recipientMap),
        true
    );
  }

  // reedemm all your rdai to dai
  async disable() {
    await this.rDAIContract.redeemAll();
  }

  async getInfo() {
    let decimals_rDAI = await this.rDAIContract.decimals();

    // Balance
    const rDAIBalance_BN = await this.rDAIContract.balanceOf(this.userAddress);
    const rDAIBalance = rDAIBalance_BN.div(decimals_rDAI).toNumber();

    // Unclaimed Balance
    let unclaimedBalance_BN = await this.rDAIContract.interestPayableOf(this.userAddress);
    let unclaimedBalance = unclaimedBalance_BN.div(decimals_rDAI).toNumber();

    let recipients = [];
    let proportions = [];
    let unallocatedBalance = 0;

    // Check if the user has a hat
    let SELF_HAT_ID = await this.rDAIContract.SELF_HAT_ID;
    const currentHat = await this.rDAIContract.getHatByAddress(this.userAddress);
    if (!currentHat.hatID.eq(SELF_HAT_ID) && !currentHat.hatId.isZero()) {
      //grab user's index
      const userIdx = recipients.indexOf(this.userAddress.toLowerCase());
      unallocatedBalance = proportions[userIdx];

      recipients = currentHat.recipients.map(r => r.toLowerCase());
      recipients.splice(userIdx, 1); // remove user from recipients

      proportions = currentHat.proportions;
      proportions.splice(userIdx, 1); // remove user from the proportions
    }

    return {
      allocations: {
        recipients: recipients,
        proportions: proportions
      },
      balance: rDAIBalance,
      unallocated_balance: unallocatedBalance,
      unclaimed_balance: unclaimedBalance
    };
  }

  async startFlow(recipientAddress, amount) {
    const PROPORTION_BASE = await this.rDAIContract.PROPORTION_BASE;
    const decimals_rDAI = await this.rDAIContract.decimals();

    // getBalance
    const balance_BN = await this.rDAIContract.balanceOf(this.userAddress);
    const balance = balance_BN.div(decimals_rDAI).toNumber();

    const currentHat = await this.rDAIContract.getHatByAddress(this.userAddress);
    const SELF_HAT_ID = await this.rDAIContract.SELF_HAT_ID;

    const [receipents, proportions] = currentHat;

    // calculate proportions whole numbers
    let portionWholeNum = proportions.map(portion => {
      return (portion / PROPORTION_BASE) * balance;
    });
    
    //turn recipients and proportions into map
    let recipientMap = {};
    receipents.forEach((address, i) => recipientMap[address] = portionWholeNum[i]);

    //validate if hat !exist
    if (currentHat.hatID.eq(SELF_HAT_ID) || currentHat.hatId.isZero()) {
      if (balance < amount) throw "insuffient balance";
    }

    //validate if there are amounts left in user portion
    if (!(this.userAddress in recipientMap)) throw "insufficient balance left";

    let userBal = recipientMap[this.userAddress] ? recipientMap[this.userAddress] : balance;
    let receipientBal = recipientMap[recipientAddress] ? recipientMap[receipientAddress] : 0;
    let sum = userBal + receipientBal;
    if (sum < amount) throw "insufficent balance left";

    //We have enough to update, continue and update values
  
    //update values between user and receipient
    const amountNeeded = amount - receipientBal;
    userBal -= amountNeeded;
    receipientBal += amountNeeded;

    //set values
    recipientMap[this.userAddress] = userBal;
    recipientMap[recipientAddress] = receipientBal;

    // remove addresses that have 0 flow
    for (let [address, balance] of Object.entries(recipientMap)) {
        if (balance == 0) {
            delete recipientMap[address];
        }
    }
    //update to new hat values
    await this.rDAIContract.createHat(
      Object.keys(recipientMap),
      Object.values(recipientMap),
      true
    );
  }

  // removes rDai interest assigned to addressToRemove
  // and reflows it back to self
  async endFlow(addressToRemove) {
    // TODO: validate recipientAddress
    const PROPORTION_BASE = await this.rDAIContract.PROPORTION_BASE;
    const decimals_rDAI = await this.rDAIContract.decimals();

    // getBalance
    const balance_BN = await this.rDAIContract.balanceOf(this.userAddress);
    const balance = balance_BN.div(decimals_rDAI).toNumber();

    const currentHat = await this.rDAIContract.getHatByAddress(this.userAddress);
    const SELF_HAT_ID = await this.rDAIContract.SELF_HAT_ID;

    const [receipents, proportions] = currentHat;

    // calculate proportions whole numbers
    let portionWholeNum = proportions.map(portion => {
      return (portion / PROPORTION_BASE) * balance;
    });
    
    // turn recipients and proportions into map
    let recipientMap = {};
    receipents.forEach((address, i) => recipientMap[address] = portionWholeNum[i]);

    // validate if hat !exist
    if (currentHat.hatID.eq(SELF_HAT_ID) || currentHat.hatId.isZero()) throw "No flows to end";
    
    // validate if there are amounts left in user portion
    if(!(addressToRemove in recipientMap)) throw `address: ${addressToRemove} does not exist`;

    let userBal = recipientMap[this.userAddress] ? recipientMap[this.userAddress] : 0;
    let receipientBal = recipientMap[recipientAddress];
    
    //update and set values between user and receipient
    recipientMap[this.userAddress] = userBal + receipientBal;
    recipientMap[recipientAddress] = 0;

    // remove addresses that have 0 flow
    for (let [address, balance] of Object.entries(recipientMap)) {
        if (balance == 0) {
            delete recipientMap[address];
        }
    }

    //update to new hat values
    await this.rDAIContract.createHat(
      Object.keys(recipientMap),
      Object.values(recipientMap),
      true
    );
  }

  async getUnclaimedAmount(address) {
    const response = await this.rDAIContract.interestPayableOf(address);
    const output = response.div(WeiPerEther).toNumber();
    return output;
  }

  async claimAmount(address) {
    //this cashes out all rDAI in both interest
    //and principal and sends it back to the user
    await this.rDAIContract.payInterest(address);
  }
}
