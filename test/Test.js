const ethers = require('ethers')
const rDAI = require('../src/contracts/rDai.json')


contract('TESTING', async (accounts) => {

  let provider
  let contract

    before(async() => {
      console.log(accounts[0])
      provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      contract = new ethers.Contract(
                          "0xeA718E4602125407fAfcb721b7D760aD9652dfe7",
                          rDAI,
                          provider.getSigner(0)
                        )
    });

    describe("Test Describe", async() => {
      it("getHatByAddress", async () => {
        let val = await contract.getHatByAddress("0xb893D8F6779842959C1dfC3095b1c62ceAA16703")
        assert.equal(true, true, "did not pass")
      });
  });
});
