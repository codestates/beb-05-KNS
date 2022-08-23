const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");

const { user } = require("../models");

module.exports = {
  getEth: async (address, userId) => {
    try {
      const sendAccount = process.env.SERVER_ADDRESS;
      const privateKey = process.env.SERVER_PRIVATE_KEY;
      const tx = {
        from: sendAccount,
        to: address,
        gas: 500000,
        value: web3.utils.toWei("0.1", "ether"),
      };
      await web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, hash) => {
          if (err) {
            console.log("transaction 실패 : ", err);
          } else {
            const balance = await web3.eth.getBalance(address);

            const user = await user.updateOne({ id: userId }, { ethAmount: parseFloat(web3.utils.fromWei(balance, "ether")) });
            return user;
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
};