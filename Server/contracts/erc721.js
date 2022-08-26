const Web3 = require("web3");
const web3 = new Web3(process.env.NODE_URI);
const { erc20ABI, erc721ABI } = require('../Abi');

module.exports = {

    //erc20으로 setToken 하고 mintToken 
    setToken: async () => {    
        const sendAccount = process.env.SERVER_ADDRESS;
        const privateKey = process.env.SERVER_PRIVATE_KEY;    
        const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
        const erc721Contract = new web3.eth.Contract(erc721ABI, process.env.ERC721ADDR);
        const data = erc721Contract.methods.setToken(process.env.ERC20ADDR).encodeABI();
        const tx = {
            from: sendAccount,
            to: process.env.ERC721ADDR,
            nonce: nonce,
            gas: 100000,
            data: data,
        };
    
        web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
            web3.eth.sendSignedTransaction(signedTx.rawTransaction,async (err, hash) => {
                if (!err) {
                    console.log("성공0");
                } else {
                    console.log("실패0");
                }
            });
        })
        .catch((err) => {
            console.log("실패00", err);
        });
    },

    mintToken: async (receiveAccount, tokenUri) => {
        const sendAccount = process.env.SERVER_ADDRESS;
        const privateKey = process.env.SERVER_PRIVATE_KEY;
        const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
        const erc721Contract = new web3.eth.Contract(erc721ABI, process.env.ERC721ADDR);
        const txData = erc721Contract.methods.mintNFT(receiveAccount, tokenUri).encodeABI();
        const tx = {
            from: sendAccount,
            to: contractE721Addr,
            nonce: nonce,
            gas: 100000,
            data: txData,
        };

        web3.eth.accounts.signTransaction(tx, privateKey).then(async (signedTx) => {
            web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, req) => {
                if (!err) {
                    const newTokenId = await erc721Contract.methods
                        .checkTokenId(tokenUri)
                        .call();

                    console.log("성공1 newTId",newTokenId);
                    return newTokenId;                
                } else {
                    console.log("실패1", err);
                    return false;
                }
            });
        })
        .catch((err) => {
            console.log("실패11",err);
            return false;
        });
    },

};