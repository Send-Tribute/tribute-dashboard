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

  // takes the amount of rDAI set to self and reflows it to another address
  // this assumes a recipient that doesnt exist within the hat
  // what about recipients that already exist
  // this also handles an update flow
  async startFlow(recipientAddress, amount) {
    // TODO: validate recipientAddress

    // getBalance
    const decimals_rDAI = await this.rDAIContract.decimals();
    const balance_BN = await this.rDAIContract.balanceOf(this.userAddress);
    const balance = balance_BN.div(decimals_rDAI).toNumber();

    const currentHat = await this.rDAIContract.getHatByAddress(this.userAddress);
    // destructuring const {hatID: currentHatID, } = currentHat
    const SELF_HAT_ID = await this.rDAIContract.SELF_HAT_ID;

    // NOTE: on the case where your address doesnt exist in your hat
    // this means that we cannot move forward because we cannot figure out
    // how much left over rDAI your hat contains.
    // method should throw error.
    // pass responisbity to calling function and request that the user resets his/her hat
    if (currentHat.hatID.eq(SELF_HAT_ID) || 
        currentHat.hatID.isZero() || 
        this.userAddress.toLowerCase() !== currentHat.recipients[0].toLowerCase()) {

        // recreate a blank hat
        // then add recipient
        // or do error throwing
    } else { // we assume that thier current hat has been created by our system
        
        // calulate current proportions
        const PROPORTION_BASE = await this.rDAIContract.PROPORTION_BASE;
        const currentPortions = currentHat.proportions.map(portion => {
            return (portion / PROPORTION_BASE) * balance;
        });
        console.log('Current hat: ', currentHat.recipients, currentPortions);
        
        const unallocated = currentPortions[0];
        if (unallocated < amount)
            throw `Not enough unallocated tribute. You have ${unallocated} Tribute available`;

        // Create the new values
        let newProportionsInTribute = currentPortions;
        let newRecipients = currentHat.recipients.map(recipient => recipient.toLowerCase());
        const recipientIndex = newRecipients.indexOf(this.recipientAddress.toLowerCase());

        if (recipientIndex > 0) { // handle if recipient currently exists within the hat

        } else { // handle if the recipient is a brand new recipient
            newRecipients.push(recipientAddress.toLowerCase());
            // Increase the proportion of the recipient by amount
            newProportionsInTribute[newRecipients.length - 1] = amount;
            // Decrease the proportion of user by amount
            newProportionsInTribute[selfIndex] -= amount;
            console.log('New hat: ', newRecipients, newProportionsInTribute);
        }

        await this.rDAIContract.createHat(newRecipients, newProportions, true);
    }
  };


  // removes rDai interest assigned to addressToRemove
  // and reflows it back to self
  async endFlow(addressToRemove) {
    // TODO: validate recipientAddress

    // getBalance
    const decimals_rDAI = await this.rDAIContract.decimals();
    const balance_BN = await this.rDAIContract.balanceOf(this.userAddress);
    const balance = balance_BN.div(decimals_rDAI).toNumber();

    const currentHat = await this.rDAIContract.getHatByAddress(this.userAddress);

    const SELF_HAT_ID = await this.rDAIContract.SELF_HAT_ID;

    if (currentHat.hatID.eq(SELF_HAT_ID) || 
        currentHat.hatID.isZero() || 
        this.userAddress.toLowerCase() !== currentHat.recipients[0].toLowerCase()) {

        // throw error

    } else { // we assume that thier current hat has been created by our system
        // find recipient within hat
        const recipientIndex = currentHat.recipients
                .map( recipient => recipient.toLowerCase() )
                .indexOf( this.addressToRemove.toLowerCase() );

        // handle if reciepient currently exists within the hat
        if (recipientIndex < 0) {
            throw 'You are not sending any Tribute to this address.';
        } else { // normal removal

            // calulate current proportions
            const PROPORTION_BASE = await this.rDAIContract.PROPORTION_BASE;
            const currentPortions = currentHat.proportions.map(portion => {
                return (portion / PROPORTION_BASE) * balance;
            });
            console.log('Current hat: ', currentHat.recipients, currentPortions);

            // Create the new values
            let newProportions = currentHat.proportions;
            let newRecipients = currentHat.recipients.map(recipient => recipient.toLowerCase());

            const removeAddressProportion = currentHat.proportions[recipientIndex];
            newProportions[0] += removeAddressProportion;
            newProportions.splice(recipientIndex, 1); // removes at index
            newRecipients.splice(recipientIndex, 1); 
            console.log('New hat (proportion): ', newRecipients, newProportions);

            await this.rDAIContract.createHat(newRecipients, newProportions, true);
        }
    }
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
