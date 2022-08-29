const Web3 = require("web3");
const web3 = new Web3(process.env.NODE_URI);
var Contract = require("web3-eth-contract");
const { user } = require("../models");
require("dotenv").config();
Contract.setProvider(process.env.NODE_URI);

const {KNSTokenAbi} = require("./KNSToken");
var contractABI = KNSTokenAbi;

module.exports = {

    sendToken: async (userId, toAddress, value) => {
    var contract = await new Contract(contractABI, process.env.ERC20_ADDRESS);

    console.log(userId);
    console.log(toAddress);
    console.log(value);

    const userInfo = await user.findOne({
        where: {id: userId}
    });
    /* const toUser = await user.findOne({
        where: {id: toUserId}
    }); */

    const txData = contract.methods.transfer(toAddress, value).encodeABI();
    const rawTransaction = {
        to: process.env.ERC20_ADDRESS,
        gas: 100000,
        data: txData,
    };
    web3.eth.accounts
        .signTransaction(rawTransaction, process.env.SERVER_PRIVATE_KEY)
        .then(async (signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, req) => {
            if (!err) {
            await contract.methods
                .balanceOf(toAddress)
                .call()
                .then(async (balance) => {
                console.log(toAddress + " Token Balance: " + balance);

                // 토큰 받은 사용자 토큰 잔액 업데이트
                await user.update(
                  { tokenAmount: balance },
                  { where: {address: toAddress} }
                );

                // 토큰 전송 사용자 토큰 잔액 차감
                await user.increment({tokenAmount: -value}, {where: {id: userId}}) 

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

  // 토큰 보상 지급 함수
  serveToken: async (userId, value) => {

    const userData = await user.findOne({
        where: {id: userId}
    });

    const { address } = userData;
    const sender = process.env.SERVER_ADDRESS;
    const senderPK = process.env.SERVER_PRIVATE_KEY;
    var contract = await new Contract(contractABI, process.env.ERC20_ADDRESS);
    const txData = contract.methods.transfer(address, value).encodeABI();
    const rawTransaction = {
      to: process.env.ERC20_ADDRESS,
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
                
                // 토큰 받은 사용자 토큰 잔액 업데이트
                user.update(
                  { tokenAmount: balance },
                  { where: {id: userId} }
                );
                
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