const ethers = require('ethers')
const BigNumber = require('bignumber.js')
const rDAI_abi = require('../src/contracts/rDai.json')
const DAI_abi = require('../src/contracts/dai.json')
const Tribute = require('../src/dashboard/Tribute')
const rDAI_Kovan = "0xeA718E4602125407fAfcb721b7D760aD9652dfe7"
const DAI_Kovan = "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99"

contract('TESTING', async (accounts) => {

  let tribute
  let rDAIContract
  let DAIContract
  let randomAccount = "0xE752CA6E0daFAC4e98B50F127f3aaDfae7f8cEA2"

    before(async() => {
      console.log("Using account: " + accounts[0])
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      rDAIContract = new ethers.Contract(
        rDAI_Kovan,
        rDAI_abi,
        provider.getSigner()
      );
      DAIContract = new ethers.Contract(
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
        let val = await tribute.getInfo()
        assert.isOk(val.allocations, "no allocation field")
        assert.isOk(val.allocations.recipients, "no recipients field")
        assert.isOk(val.allocations.proportions, "no proportions field")
        assert.isOk(val.balance, "no balance field")
        assert.isOk(val.unallocated_balance, "no unallocated balance field")
        assert.isOk(val.unclaimed_balance, "no unclaimed balance field")
      })

      it("Test generate", async() => {
        let amountToIncrease = 70
        let before = await tribute.getInfo()
        await tribute.generate(amountToIncrease)
        let after = await tribute.getInfo()

        let before_balance = new BigNumber(before.balance)
        let after_balance = new BigNumber(after.balance)
        let before_unallocated = new BigNumber(before.unallocated_balance)
        let after_unallocated = new BigNumber(after.unallocated_balance)

        assert.equal(
          before_balance.plus(amountToIncrease).toFixed(2),
          after_balance.toFixed(2),
          "improper balances"
        )
        assert.equal(
          before_balance.plus(amountToIncrease).toFixed(2),
          after_balance.toFixed(2),
          "improper unallocated balance"
        )
      })

      it("Test startFlow", async() => {
        let amountToFlow = 10
        let before = await tribute.getInfo()
        await tribute.startFlow(randomAccount, amountToFlow)
        let after = await tribute.getInfo()

        let before_unallocated = new BigNumber(before.unallocated_balance)
        let after_unallocated = new BigNumber(after.unallocated_balance)

        assert.equal(
          before_unallocated.sub(amountToFlow).toFixed(2),
          after_unallocated.toFixed(2),
          "improper unallocated balance"
        )
      })

      it.skip("Test endFlow", async() => {
        let before = await tribute.getInfo()
        await tribute.endFlow(randomAccount)
        let after = await tribute.getInfo()

        assert.equal(
          parseFloat(before.balance) - amountToFlow,
          parseFloat(after.balance),
          "improper balances"
        )
        assert.equal(
          parseFloat(before.unallocated_balance) - amountToFlow,
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
