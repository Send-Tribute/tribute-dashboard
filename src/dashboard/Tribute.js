
import 'babel-polyfill';
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
    this.address = address;

    this.generateUnallocatedTribute = async (amountToTribute) => {
        //provided some amount generate more
        //rDAI so that it can be allocated
        // amountToTribute to big number and in wei

        await this.DAIContract.approve();
        await this.rDAIContract
    }

    this.sendTribute = async () => {
        // begin flowing of tribute from an account to another account
        await contract.createHat();
    }

    this.disableTribute = async () => {
        //stop flowing of tribute from an account to another account
        //set hat back to 0 hat
        console.log(this.address)
        this.rDAIContract = this.rDAIContract.connect(this.signer);
        console.log(rDAIContract.getHatByAddress())
        return await this.rDAIContract.changeHat(0);
    }

    this.updateTributeAllocations = () => {
        //this will add, remove, and modify existing amounts
        //this will allow batch allocation updates

        // let currentHat = await contract.getHatByAddress();
        //get data from current hat
        //do math to compute how much everybody else needs to be allocated
        //create a new hat with MODS to the existing recipients
        // await contract.createHat();
    }

    this.getIncomingTribute = async () => {
        //shows current amount of interest being generated against an account
        await contract.interestPayableOf();
    }

    this.claimTribute = async () => {
        //this cashes out all rDAI in both interest
        //and principal and sends it back to the user
        await contract.redeemAll();
    }

    this.isTributeFlowing = async () => {
        //if the account has a 0 hat then no tribute is flowing out
        //
        //NOTE: check if its possible to have no rDAI, 
        //but allocate a hat and make it APPEAR like tribute is flowing
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
