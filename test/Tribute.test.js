const ethers = require('ethers')
const rDAI_abi = require('../src/contracts/rDai.json')
const rDAI_Kovan = "0xeA718E4602125407fAfcb721b7D760aD9652dfe7"

contract('TESTING', async (accounts) => {

  let provider
  let contract

    before(async() => {
      provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      contract = new ethers.Contract(
                          rDAI_Kovan,
                          rDAI_abi,
                          provider.getSigner(0)
                        )
      console.log("Using account: " + accounts[0])
    });

    describe("Test Describe", async() => {
      it("getHatByAddress", async () => {
        let val = await contract.getHatByAddress(accounts[0])
        console.log(val.hatID.toNumber())
      });

      it("changeHat", async () => {
        await contract.changeHat(48)
      });

      it("getHatByAddress", async () => {
        let val = await contract.getHatByAddress(accounts[0])
        console.log(val.hatID.toNumber())
      });
  });
});
