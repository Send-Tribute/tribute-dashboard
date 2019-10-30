const ethers = require('ethers')
const rDAI_abi = require('../src/contracts/rDai.json')
const DAI_abi = require('../src/contracts/dai.json')
const Tribute = require('../src/dashboard/Tribute')
const rDAI_Kovan = "0xeA718E4602125407fAfcb721b7D760aD9652dfe7"
const DAI_Kovan = "0xC4375B7De8af5a38a93548eb8453a498222C4fF2"

contract('TESTING', async (accounts) => {

  let tribute
  let rDAIContract

    before(async() => {
      console.log("Using account: " + accounts[0])
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      rDAIContract = new ethers.Contract(
        rDAI_Kovan,
        rDAI_abi,
        provider.getSigner()
      );
      const DAIContract = new ethers.Contract(
        DAI_Kovan,
        DAI_abi,
        provider.getSigner()
      );
      tribute = new Tribute(
        DAIContract,
        rDAIContract,
        accounts[0]
      );
    });

    describe("Test Tribute", async() => {
      it("Test getInfo", async() => {
        let output = await rDAIContract.getHatByAddress("0xb893D8F6779842959C1dfC3095b1c62ceAA16703")
        console.log(output)

        let val = await tribute.getInfo()
        console.log(val)
        assert.isOk(val.allocations, "no allocation field")
        assert.isOk(val.allocations.recipients, "no recipients field")
        assert.isOk(val.allocations.proportions, "no proportions field")
        assert.isOk(val.balance, "no balance field")
        assert.isOk(val.unallocated_balance, "no unallocated balance field")
        assert.isOk(val.unclaimed_balance, "no unclaimed balance field")
      })

      it("Test generate", async() => {
        let amountToIncrease = 5
        let before = await tribute.getInfo()
        await tribute.generate(amountToIncrease)
        let after = await tribute.getInfo()

        assert.equal(
          parseFloat(before.balance) + amountToIncrease,
          parseFloat(after.balance),
          "improper balances"
        )
        assert.equal(
          parseFloat(before.unallocated_balance) + amountToIncrease,
          parseFloat(after.unallocated_balance),
          "improper unallocated balance"
        )
      })
    })

//    describe("Test Describe", async() => {
//      it("getHatByAddress", async () => {
//        let val = await contract.getHatByAddress(accounts[0])
//        console.log(val.hatID.toNumber())
//      });
//
//      it("changeHat", async () => {
//        await contract.changeHat(48)
//      });
//
//      it("getHatByAddress", async () => {
//        let val = await contract.getHatByAddress(accounts[0])
//        console.log(val.hatID.toNumber())
//      });
//  });
});
