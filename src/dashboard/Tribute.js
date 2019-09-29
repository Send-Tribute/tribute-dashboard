import React from 'react';

export default function Tribute() {

  constructor(props) {
    this.state = { 
      contract: props.contract,
      provider: props.provider,
      signer: props.provider.getSigner();
    };
  }

  async function generateTribute(){
  }

  async function disableTribute() {
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
