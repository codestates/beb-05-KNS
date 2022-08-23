const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
var Contract = require("web3-eth-contract");
//const erc20Abi = require("../erc20Abi");
const { user } = require("../models");
require("dotenv").config();
Contract.setProvider("HTTP://127.0.0.1:7545");
//var contractABI = erc20Abi;

module.exports = {

    sendToken: async (userId, toUserId, value) => {
    var contract = await new Contract(contractABI, process.env.ERC20ADDR);

    const user = await user.findOne({
        where: {id: userId}
    });
    const toUser = await user.findOne({
        where: {id: toUserId}
    });

    const txData = contract.methods.transfer(toUser.address, value).encodeABI();
    const rawTransaction = {
        to: process.env.ERC20ADDR,
        gas: 100000,
        data: txData,
    };
    web3.eth.accounts
        .signTransaction(rawTransaction, user.privateKey)
        .then(async (signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, req) => {
            if (!err) {
            await contract.methods
                .balanceOf(toUser.address)
                .call()
                .then(async (balance) => {
                console.log(toUserId + " Token Balance: " + balance);
                await user.update({ id: toUserId }, { tokenAmount: balance });
                await user.update({ id: userId }, { $inc: { tokenAmount: -value } });
                return true;
                });
            } else {
            console.log("실패", err);
            }
        });
        })
        .catch((err) => {
        console.log(err);
        return false;
        });
    },

  serveToken: async (userId, value) => {

    const userData = await user.findOne({
        where: {id: userId}
    });

    const { address } = userData;
    const sender = process.env.TOKEN_ADDRESS;
    const senderPK = process.env.TOKEN_PRIVATEKEY;
    var contract = await new Contract(contractABI, process.env.ERC20ADDR);
    const txData = contract.methods.transfer(address, value).encodeABI();
    const rawTransaction = {
      to: process.env.ERC20ADDR,
      gas: 100000,
      data: txData,
    };
    web3.eth.accounts
      .signTransaction(rawTransaction, senderPK)
      .then(async (signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, req) => {
          if (!err) {
            await contract.methods
              .balanceOf(address)
              .call()
              .then((balance) => {
                console.log(address + " Token Balance: " + balance);
                const user = user.update({ id: userId }, { tokenAmount: balance });
                return user;
                
              });
          } else {
            console.log("실패");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },

  
};