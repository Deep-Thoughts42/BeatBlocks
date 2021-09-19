require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0xb31f50DBa95fdf55E6c9c60Bbc12521066F03D25"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)


const pinataApiKey = process.env.PINATA_PUBLIC_KEY;
const pinataSecretApiKey = process.env.PINATA_PRIVATE_KEY;

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

const fs = require('fs');

async function uploadNFT(name, base64){
  try {
    const JSONUpload = await pinata.pinJSONToIPFS({
      "name": name,
      "description": "Created on BeatBlox",
      "external_url": base64,
      "background_color" : Math.floor(Math.random()*16777215).toString(16)
    })
    mintNFT(`https://gateway.pinata.cloud/ipfs/${JSONUpload.IpfsHash}`)
  }catch (err){
    console.log(err)
  }
}

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

module.exports.nft = uploadNFT;

