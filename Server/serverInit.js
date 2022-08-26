const Web3 = require('web3');
const {user} = require("./models");
//const {ethers} = require("ethers");

function getWeb3() { 
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URI));
    return web3;
}

async function getAccounts() {
    try {
        const accounts = await getWeb3().eth.getAccounts(); 
        //console.log(accounts);
        return accounts;
    } catch (e) {
        console.log(e);
        return e;
    }
}

module.exports = {
    createServerAccount: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const foundAccount = await user.findOne({
                    where: {userName: "admin"}
                });
                if (foundAccount) {
                    console.log("server account exist!!!")
                    resolve();
                } else {
                    //const account = ethers.Wallet.createRandom()
                    const accounts = await getAccounts();
                    const serverAddress = accounts[0];
                    console.log(serverAddress);

                    const newBody = {
                        userName: "admin",
                        password: "admin",
                        address: serverAddress,
                        mnemonicWord: "",
                        privateKey: process.env.SERVER_PRIVATE_KEY
                        
                    };
                    const newAccount = new user(newBody);
                    await newAccount.save();
                    console.log("server account created!!!")
                    resolve();
                }
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    },



}