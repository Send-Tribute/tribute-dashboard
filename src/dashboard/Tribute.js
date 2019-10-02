
export default function Tribute(contract, provider) {

  this.contract = contract;
  this.provider = provider;
  this.signer = provider.getSigner();

  async function generateTribute() {
    await contract.mint();
  }

  async function disableTribute() {
    await contract.redeemAll();
  }

  async function removeRecipient() {
  }

  async function addRecipient() {
  }

  async function modifyRecipient() {
  }

  async function setTribute() {
  }

  async function getInterestPayable() {
    await contract.interestPayableOf();
  }

  async function claimTribute() {
  }

  async function isTributeFlowing(){
  }

  function convertDaiRateToAllocation() {
  }

  function convertRateToAllocation() {
  }

  function getLendingRate() {
  }

  async function generateReport() {
  }
}
