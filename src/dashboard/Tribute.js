
export default class Tribute {

  construction(contract, provider) {
    this.contract = contract;
    this.provider = provider;
    this.signer = provider.getSigner();
  }

  async generateUnallocatedTribute() {
    //provided some amount generate more
    //rDAI so that it can be allocated
    await contract.mintAmount();
  }

  async sendTribute() {
    //begin flowing of tribute from an account to another account
    await contract.createHat();
  }

  async disableTribute() {
    //stop flowing of tribute from an account to another account
    //set hat back to 0 hat
    await contract.setHat(0);
  }

  async updateTributeAllocations() {
    //this will add, remove, and modify existing amounts
    //this will allow batch allocation updates

    let currentHat = await contract.getHatByAddress();
    //get data from current hat
    //do math to compute how much everybody else needs to be allocated
    //create a new hat with MODS to the existing recipients
    await contract.createHat();
  }

  async getIncomingTribute() {
    //shows current amount of interest being generated against an account
    await contract.interestPayableOf();
  }

  async claimTribute() {
    //this cashes out all rDAI in both interest
    //and principal and sends it back to the user
    await contract.redeemAll();
  }

  async isTributeFlowing(){
    //if the account has a 0 hat then no tribute is flowing out
    //
    //NOTE: check if its possible to have no rDAI, 
    //but allocate a hat and make it APPEAR like tribute is flowing
  }

  function convertDaiRateToAllocation() {
    //compute how much principal is needed for an interest rate and ideal payment
    //4000 = 400/.10 => 4k is needed to generate 400 after a year
    //
    //helper method that is used to determine how much is needed in order to allocate
  }

  function convertRateToAllocation() {
    //sounds like the exact same thing
  }

  function getLendingRate() {
    //this seems like an oracle thing
  }

  async generateReport() {
    //get hat + interest accrued + time + other things
  }
}
