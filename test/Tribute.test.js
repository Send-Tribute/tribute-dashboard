const ethers = require('ethers')
const rDAI_abi = require('../src/contracts/rDai.json')
const DAI_abi = require('../src/contracts/dai.json')
const Tribute = require('../src/dashboard/Tribute')
const rDAI_Kovan = "0xeA718E4602125407fAfcb721b7D760aD9652dfe7"
const DAI_Kovan = "0xC4375B7De8af5a38a93548eb8453a498222C4fF2"

contract('TESTING', async (accounts) => {

  let tribute

    before(async() => {
      console.log("Using account: " + accounts[0])
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      const rDAIContract = new ethers.Contract(
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

    describe("Yolo", async() => {
        it("test", async() => {
          let val = await tribute.getInfo()
          console.log(val)
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
