
export default class Tribute {

  construction(contract, provider) {
    this.contract = contract;
    this.provider = provider;
    this.signer = provider.getSigner();
  }

  async generateTribute() {
    await contract.mint();
  }

  async disableTribute() {
    await contract.redeemAll();
  }

  async removeRecipient() {
  }

  async addRecipient() {
  }

  async modifyRecipient() {
  }

  async setTribute() {
  }

  async getInterestPayable() {
    await contract.interestPayableOf();
  }

  async claimTribute() {
  }

  async isTributeFlowing(){
  }

  function convertDaiRateToAllocation() {
  }

  function convertRateToAllocation() {
  }

  function getLendingRate() {
  }

  async generateReport() {
  }
}
