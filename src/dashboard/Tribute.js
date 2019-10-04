
import 'babel-polyfill';
import {ethers} from 'ethers';
const {bigNumberify, toNumber} = ethers.utils;
const {WeiPerEther, Zero} = ethers.constants;

export default function Tribute (DAIContract, rDAIContract, provider, address) {
    /*
    +  RToken (IRToken, Ownable, ReentrancyGuard)
    - [Pub] <Constructor> #
    - [Ext] balanceOf
    - [Ext] allowance
    - [Ext] approve #
    - [Ext] transfer #
    - [Ext] transferAll #
    - [Ext] transferAllFrom #
    - [Ext] transferFrom #
    - [Ext] mint #
    - [Ext] mintWithSelectedHat #
    - [Ext] mintWithNewHat #
    - [Ext] redeem #
    - [Ext] redeemAll #
    - [Ext] redeemAndTransfer #
    - [Ext] redeemAndTransferAll #
    - [Ext] createHat #
    - [Ext] changeHat #
    - [Ext] getMaximumHatID
    - [Ext] getHatByAddress
    - [Ext] getHatByID
    - [Ext] receivedSavingsOf
    - [Ext] receivedLoanOf
    - [Ext] interestPayableOf
    - [Ext] payInterest #
    - [Ext] getGlobalStats
    - [Ext] getAccountStats
    - [Ext] getCurrentSavingStrategy
    - [Ext] getSavingAssetBalance
    - [Ext] changeAllocationStrategy #
    - [Int] transferInternal #
    - [Int] mintInternal #
    - [Int] redeemInternal #
    - [Int] createHatInternal #
    - [Int] changeHatInternal #
    - [Int] getInterestPayableOf
    - [Int] distributeLoans #
    - [Int] estimateAndRecollectLoans #
    - [Int] redeemAndRecollectLoans #
    - [Int] recollectLoans #
    - [Int] payInterestInternal #
    */

    this.DAIContract = DAIContract;
    this.rDAIContract = rDAIContract;
    this.provider = provider;
    this.signer = provider.getSigner();
    this.DAIContract = this.DAIContract.connect(this.signer);
    this.rDAIContract = this.rDAIContract.connect(this.signer);
    this.address = address;

    // [you are in first] in hat allocations, this never changes
    // every time the pricipal changes we make a new hat
    // add more rdai to your account while updating you hat
    this.generateTribute = async (amountToTribute) => {
        let bignumberAmount = bigNumberify(amountToTribute).mul(WeiPerEther)
        await this.DAIContract.approve(rDAIContract.address, bignumberAmount);

        let rDAIbalanceBigNumber = await this.rDAIContract.balanceOf(this.address[0]);
        let balance = rDAIbalanceBigNumber.div(WeiPerEther).toNumber();

        let currentHat = await this.rDAIContract.getHatByAddress(this.address[0]);

        // check for zero hat Self hat also gives you a zero hat
        if (currentHat.hatID.isZero()) {
            // if we're on zero hat we simply set a new hat
            await rDAIContract.mintWithNewHat(mintamount, recipients, proportions);
        } else {
            // TODO: check if the first address is the users address. 
            // Otherwise the hat was not made by us and we need to fix the hat

            const proportionsSum = currentHat.proportions.reduce((accl, value) => accl + value);
            // assuming that hat has users address in first slot
            let proportionsInTribute = currentHat.proportions.map(portion => {
                return portion / proportionsSum * balance;
            });
            // add to user slot
            proportionsInTribute[0] += amountToTribute;

            await this.rDAIContract.mintWithNewHat(bignumberAmount, currentHat.recipients, proportionsInTribute);
        }
    }

    // reedemm all your rdai to dai
    this.disableTribute = async () => {
        await rDAIContract.redeemAll();
    }

    // this function mints rDAI to your account
    this.getRDAI = async (amount) => {
        console.log(amount);
        console.log(bigNumberify(amount).mul(WeiPerEther));
        console.log(rDAIContract.address);
        // what happens when approval works but mint gets dropped
        await this.DAIContract.approve(rDAIContract.address, bigNumberify(amount).mul(WeiPerEther));
        // dont call newhat
        await this.rDAIContract.mint(bigNumberify(amount).mul(WeiPerEther));
        let output = await this.rDAIContract.getHatByAddress(this.address);
        console.log(output);
    }

    // send and end 
    this.sendTribute = async (address) => {
        // begin flowing of tribute from an account to another account
        await contract.createHat();
    }
    // should take out an address for a hat
    this.endTribute = async (address) => {
        // begin flowing of tribute from an account to another account
        await contract.createHat();
    }
    
    // calling pay interest payable of and converting to rdai
    // you can claim for others
    // maybe another function claimonbehalfof
    // come up with another function for other people
    this.claimTribute = async () => {
        //this cashes out all rDAI in both interest
        //and principal and sends it back to the user
        await contract.redeemAll();
    }

// TODO: work on these after other methods have been set

//   function convertDaiRateToAllocation() {
//     //compute how much principal is needed for an interest rate and ideal payment
//     //4000 = 400/.10 => 4k is needed to generate 400 after a year
//     //
//     //helper method that is used to determine how much is needed in order to allocate
//   }

//   function convertRateToAllocation() {
//     //sounds like the exact same thing
//   }

//   function getLendingRate() {
//     //this seems like an oracle thing
//   }

//   async generateReport() {
//     //get hat + interest accrued + time + other things
//   }
}
