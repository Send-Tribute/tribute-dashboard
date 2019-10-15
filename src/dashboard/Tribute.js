import 'babel-polyfill';
import { ethers } from 'ethers';
const { bigNumberify, toNumber, formatEther } = ethers.utils;

export default class Tribute {

  constructor(DAIContract, rDAIContract, userAddress) {
    this.DAIContract = DAIContract;
    this.rDAIContract = rDAIContract;
    this.userAddress = userAddress;
  }

  async generate(amountToTribute) {

    // msg.sender approves the rDAIContract to move funds on DAIContract
    let decimals_DAI = await this.DAIContract.decimals();
    let amountToTribute_BN = bigNumberify(amountToTribute).mul(decimals_DAI);
    await this.DAIContract.approve(this.rDAIContract.address, amountToTribute_BN);

    let SELF_HAT_ID = await this.rDAIContract.SELF_HAT_ID;
    let currentHat = await this.rDAIContract.getHatByAddress(userAddress);

    // if we're on self hat or zero set new hat with 100% allocation
    if (currentHat.hatID.eq(SELF_HAT_ID) || currentHat.hatId.isZero()) {
      await this.rDAIContract.mintWithNewHat(
        amountToTribute_BN,
        [this.userAddress],
        [amountToTribute]
      );
    } else {
      // else we are adding new rDai to existing rDai
      // GOAL: increase amount to your address not to others
      // NOTE: proportions are always in percentages whole. we need to convert to fraction representations
      // NOTE: first address is always user address
     
      // TODO: check if the first address is the users address.
      // Otherwise the hat was not made by us and we need to fix the hat
      
      // retrieve user balance
      let rDAIBalance_BN = await this.rDAIContract.balanceOf(userAddress);
      let decimals_rDAI = await this.rDAIContract.decimals();
      let balance = rDAIBalance_BN.div(decimals_rDAI).toNumber();

      // grab existing proportions
      const currentProportions = currentHat.proportions;

      // divide by PROPORTION_BASE
      const PROPORTION_BASE = await this.rDAIContract.PROPORTION_BASE;

      // calculate proportions whole numbers
      let updatedPortions = currentHat.proportions.map(portion => {
        return (portion / PROPORTION_BASE) * balance;
      });

      // add new amount to existing tribute for user
      updatedPortions[0] += amountToTribute;

      await this.rDAIContract.mintWithNewHat(
        amountToTribute_BN,
        currentHat.recipients,
        updatedPortions
      );
    }
  };

  // reedemm all your rdai to dai
  async disable() {
    await this.rDAIContract.redeemAll();
  };

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
  };

  async startFlow(recipientAddress, amount) {
    // TODO: validate recipientAddress
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

      // Check if the user has enough unallocated Tribute
      if (unallocatedBalane < amount)
        throw `Not enough unallocated tribute. You have ${unallocatedTribute} unallocated Tribute available`;
      console.log('Unallocated tribute: ', unallocatedTribute);
    }


    //CHECKPOINT
    


    // Create the new values
    let newProportionsInTribute = proportionsInTribute;
    let newRecipients = recipientsLowerCase;

    // Scenario 1: Recipient is not already included in the hat
    if (!newRecipients.includes(recipientAddress.toLowerCase())) {
      newRecipients.push(recipientAddress.toLowerCase());
      // Increase the proportion of the recipient by amount
      newProportionsInTribute[newRecipients.length - 1] = amount;
      // Decrease the proportion of user by amount
      newProportionsInTribute[selfIndex] -= amount;
    }
    console.log('New hat: ', newRecipients, newProportionsInTribute);

    // Scenario 2: Recipient is already icluded in the hat
    // TODO: de-scoped for demo. until then, call endTribute to first remove the recipient from the hat before adding them back with the new amount.

    // Set the new hat
    let greatestSize = 0;
    newProportionsInTribute.forEach(portion => {
      const integer = portion.toString().split('.')[0];
      if (integer) {
        if (integer.length > greatestSize) greatestSize = integer.length;
      }
    });
    const MAX_SIZE = 9; // Must be uint32 e.g. less than 4,294,967,295
    const decimalMultiplier = MAX_SIZE - greatestSize;
    const newProportions = newProportionsInTribute.map(portion => {
      return Math.trunc(portion * Math.pow(10, decimalMultiplier));
    });
    await this.rDAIContract.createHat(newRecipients, newProportions, true);
  };

  async endFlow(address) {
    // begin flowing of tribute from an account to another account

    // TODO: validate recipientAddress

    const currentHat = await this.rDAIContract.getHatByAddress(this.address[0]);
    // get user balance
    const balanceBigNumber = await this.rDAIContract.balanceOf(this.address[0]);
    const balance = balanceBigNumber.div(WeiPerEther).toNumber();
    if (currentHat.proportions.length < 1) throw "You don't have any Tribute";
    // calculate the current proportions in units of Tribute
    const proportionsSum = currentHat.proportions.reduce(
      (accl, value) => accl + value
    );
    const proportionsInTribute = currentHat.proportions.map(portion => {
      return (portion / proportionsSum) * balance;
    });
    console.log('Current hat: ', currentHat.recipients, currentHat.proportions);

    // Get a searcheable lowercase recipient list
    const recipientsLowerCase = currentHat.recipients.map(a => a.toLowerCase());

    // Create the new values
    let newProportions = currentHat.proportions;
    let newRecipients = recipientsLowerCase;

    // Check if the recipient is included in the hat
    const removeAddressIndex = recipientsLowerCase.indexOf(
      address.toLowerCase()
    );
    if (removeAddressIndex < 0) {
      throw 'You are not sending any Tribute to this address.';
    }

    // If so, remove the recipient from the new hat
    newRecipients.splice(removeAddressIndex, 1);

    // Add user to new hat if necessary
    let selfIndex = recipientsLowerCase.indexOf(this.address[0].toLowerCase());
    if (selfIndex < 0) {
      newRecipients.push(this.address[0]);
      selfIndex = newRecipients.length - 1;
    }

    // Get the removed address proportions
    const removeAddressProportion = currentHat.proportions[removeAddressIndex];
    console.log(removeAddressProportion);
    // Increase the proportion of user by amount
    newProportions[selfIndex] += removeAddressProportion;

    // Remove the proportion from the new hat
    newProportions.splice(removeAddressIndex, 1);

    console.log('New hat (proportion): ', newRecipients, newProportions);

    await this.rDAIContract.createHat(newRecipients, newProportions, true);
  };

  async getUnclaimedAmount(address) {
    const response = await this.rDAIContract.interestPayableOf(address);
    const output = response.div(WeiPerEther).toNumber();
    return output;
  };

  async claimAmount(address) {
    //this cashes out all rDAI in both interest
    //and principal and sends it back to the user
    await this.rDAIContract.payInterest(address);
  };
}
