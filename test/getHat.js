const ethers = require('ethers');
const rDAI = require('../src/contracts/rDai.json')

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")

const contract = new ethers.Contract(
                    "0xeA718E4602125407fAfcb721b7D760aD9652dfe7",
                    rDAI,
                    provider.getSigner(0)
                  )

async function getHat() {
  let val = await contract.getHatByAddress("0xb893D8F6779842959C1dfC3095b1c62ceAA16703")
  console.log(val)
}

getHat()

