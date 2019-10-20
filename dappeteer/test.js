require('dotenv').config()

const puppeteer = require('puppeteer')
const dappeteer = require('dappeteer')

console.log(process.env.SEED);

async function main() {
  const browser = await dappeteer.launch(puppeteer)
  const metamask = await dappeteer.getMetamask(browser, {seed: process.env.SEED})
  // create or import an account
  //   await metamask.createAccount()
  //   await metamask.importAccount('SEED')
  // you can change the network if you want
  await metamask.switchNetwork('kovan')

  const page = await browser.newPage();
  await page.goto('http://localhost:1234/dashboard.html')
  // go to a dapp and do something that prompts MetaMask to confirm a transaction

  // 🏌
  // await metamask.confirmTransaction()
  await page.screenshot({path: 'example.png'});
  await browser.close()
}

try{
    main()
} catch(error) {
    console.log(error)
}
