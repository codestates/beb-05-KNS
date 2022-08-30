const Web3 = require('web3');
const {user} = require("./models");
const {ethers} = require("ethers");
const bcrypt = require("bcrypt");

const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URI);
//const {KNSTokenAbi}=require('./contracts/KNSToken');

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

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
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

                    const salt = await bcrypt.genSalt(10);
                    const cryptPassword = bcrypt.hashSync("admin", salt); //비밀번호 암호화

                    const newBody = {
                        userName: "admin",
                        password: cryptPassword,
                        address: serverAddress,
                        mnemonicWord: "",
                        privateKey: process.env.SERVER_PRIVATE_KEY,
                        tokenAmount: 10000000
                        
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

    deployContracts: (type, abi, bytecode) => {
        return new Promise(async (resolve, reject) => {
            try {
                const serverContract = await contract.findOne({
                    where: {type: type}
                });
                const data = await user.findOne({
                    where: {email: "admin"}
                });
                if (serverContract === null) {
                    const serverWallet = new ethers.Wallet(data.privateKey, provider)
                    const gasPrice = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
                    const options = {gasLimit: 6721975, gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei')}
                    const factory = new ethers.ContractFactory(abi, bytecode, serverWallet)
                    let serverBalance = await provider.getBalance(data.address)
                    while (serverBalance < 0.1){
                        await sleep(1000)
                        serverBalance = await provider.getBalance(data.address)
                        console.log("loading...")
                    }
                    console.log("complete!")
                    const serverContract = await factory.deploy(options)
                    await serverContract.deployed()
                    const serverContractAddress = serverContract.address
                    console.log(`Deployment successful! Contract Address: ${serverContractAddress}`)
                    const newBody = {contractAddress: serverContractAddress, type: type};
                    const newContract = new contract(newBody);
                    await newContract.save();
                    resolve();
                } else {
                    console.log("Contract is already deployed!");
                    console.log(`Contract Address: ${serverContract.contractAddress}`);

                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        });
    },

}