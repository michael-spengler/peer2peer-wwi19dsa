//require('dotenv').config()
const Web3 = require('web3');


//let INFURA_PROJECT_ID = "4d1d436ef4f1457c9781833debf38651";
const Tx = require('ethereumjs-tx').Transaction;i
//const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));
//const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/4d1d436ef4f1457c9781833debf38651`));
const web3 = new Web3(new Web3.providers.HttpProvider(`HTTP://127.0.0.1:7545`));

export const transfer = async () => {


    web3.eth.getGasPrice().then((gasPrice) => {
        web3.eth.getTransactionCount("0x8119C243f55F8e5f8dAA0dD9552BDbD1c757266D", 'pending').then((nonce) => {
            let txParams = {
                nonce: web3.utils.toHex(nonce),
                gasLimit: web3.utils.toHex(web3.utils.toHex(33000)),
                gasPrice: web3.utils.toHex(gasPrice),
                //from: process.env.SOURCE_ACCOUNT,
                from: "0x8119C243f55F8e5f8dAA0dD9552BDbD1c757266D",
                to: "0x9a094b0d801A9eE383808E30d1951D5D1aA727A7",
                value: 0.07 * 1000000000000000000,
                chainId: web3.utils.toHex(1),
            }
            let tx = new Tx(txParams);
            let privKey = Buffer.from('70f3b120b2d82d8b0452f3c36dafc4ad52ea530bbaad2a4df55ab53d9d82013f', 'hex');
            tx.sign(privKey);
            tx = "0x" + tx.serialize().toString('hex')
            web3.eth.sendSignedTransaction(tx)
                .on('transactionHash', (hash) => {
                    console.log(hash);
                })
                .on('receipt', (receipt) => {
                    console.log(receipt);
                    return "receipt"
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    console.log(confirmationNumber);
                    console.log(receipt);
                })
                .on('error', console.error);
        })
    });
}

