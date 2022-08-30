const {nft, post, user, comment} = require('../models');
const erc721 = require("../contracts/erc721");

const {isAuthorized} = require('./webToken')
//const {mintToken} = require('./smartContract')
const {asyncWrapper} = require("../errors/async");
const CustomError = require("../errors/custom-error");
const StatusCodes = require("http-status-codes");
//const {sendToken} = require('./smartContract')

module.exports = {
    //NFT 생성
    createNFT: asyncWrapper(async (req, res) => {
        const { data: bodydata } = req.body;

        if (bodydata.tokenName === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }        
        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
        const userId = userInfo.id
        if (!userId) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }

        const {tokenId, tokenName, desc, tx_hash, tokenURI, img} = bodydata;  
        const newNFT = new nft({
            userId,
            tokenId,
            tokenName,
            desc,
            tx_hash,
            tokenURI,
            img
        });
        try {
            // db에 저장  //NFT 민팅은 여기서 안하고 구매시 한다.
            const createdNFT = await newNFT.save(); 
            res.status(StatusCodes.CREATED).json({status: "successful created", data: {nftId: createdNFT.id}});
        } catch (err) {
            throw new Error(err);
        }
    }),

    //NFT 구매
    buyNFT : asyncWrapper(async (req, res) => {
        const nftId = req.params.nftId;

        if (nftId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        const decoded = await isAuthorized(req); //로그인했는지 권한 체크    
        if (!decoded) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }        
        const userInfo = await user.findOne({
            where: {id: decoded.id},
        });
        const userId = userInfo.id
        if (!userId) {
            throw new CustomError("인가되지 않은 사용자입니다.", StatusCodes.UNAUTHORIZED);
        }

        const toUserData = await user.findOne({
            where: {address: userInfo.address}
        });
        // 토큰 전송할 NFT 정보를 가져옴
        const fromNFTData = await nft.findOne({
            where: {id: nftId}
        });

        // NFT 구매
        // console.log('----file url----',toUserData.address, fromNFTData.tokenURI);
        const callDbupcall = async (result,uid,nftId,tx_hash) => {
            if(result){           
                //console.log('------restoreToken: ' + result);                 
                                
                nft.sequelize.query("SELECT MAX(id) FROM nfts", { type: nft.sequelize.QueryTypes.SELECT})
                .then(async (result) => {
                    const { 'MAX(id)': newTokenId } = result[0];
                    //console.log('------queryresult: ',newTokenId);  
                    const fromNFTData = await nft.findOne({
                        where: {id: nftId}
                    });       
                    const result1 = await fromNFTData.update({
                        userId: uid,
                        tokenId: newTokenId+1,
                        tx_hash: tx_hash,
                        isBuy: true,
                    });
                    //console.log('------updateres: ',result1);
                    res.status(StatusCodes.OK).json({status: "successful operation"})
                })  
            }
            else{
                console.log('----실패----'); 
            }
        }

        await erc721.mintToken( toUserData.address, fromNFTData.tokenURI, callDbupcall,toUserData.userId,nftId);             
    }),

    // NFT ID를 받아서 해당 NFT 상세 정보 응답
    getNFTById: asyncWrapper(async (req, res) => {
        const { nftId } = req.params;
        
        if (nftId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        //전달받은 id를 가진 nft를 찾아옴
        const nftData = await nft.findOne({
            where: {id: nftId}
        });

        //해당 id를 가진 nft 없으면 에러 응답
        if (!nftData) {
            //404 not found
            throw new CustomError(`NFT 정보가 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
        }
        const {id, userId, tokenId, tokenName, desc, tx_hash, tokenURI,
               img, isBuy, Price, prevUserId} = postData;

        const {userName} = await user.findOne({
            where: {id: nftData.userId}
        });

        res.status(200).json({
            status: "successful operation",
            data: {
                id,
                userId,
                userName,
                tokenId,
                tokenName,
                desc,
                tx_hash,
                tokenURI,
                img,
                isBuy,
                Price,
                prevUserId
            },
        });
    }),
    
    //전체 NFT 정보 가져오기
    getAllNFT: asyncWrapper(async (req, res) => {
        
        const nftInfo = await nft.findAll();
        // Array에 map을 돌 때 콜백함수가 비동기면 일반적인 방법으로는 구현이 안됨
        // 그래서 Promise.all을 사용함
        const data = await Promise.all(
            nftInfo.map(
                async ({id, userId, tokenId, tokenName, desc, img, createdAt, isBuy, Price}) => {
                    const {userName} = await user.findOne({
                        where: {id: userId},
                    });
                    
                    return {
                        id,
                        userId,
                        userName,
                        tokenId,
                        tokenName,
                        desc,
                        img,
                        createdAt,
                        isBuy,
                        Price
                    };
                }
            )
        );
        res.status(200).json({
            status: "successful operation",
            data,
        });
    }),

    //NFT 전송
    transferNFT : asyncWrapper(async (req, res) => {
        const nftId = req.params.nftId;
        const {address} = req.body;

        if (nftId === undefined || address === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }

        const toUserData = await user.findOne({
            where: {address: address}
        });
        
        if (!toUserData) {
            //404 not found
            throw new CustomError(`NFT 전송할 지갑 정보가 없습니다.`, StatusCodes.NOT_FOUND);
        }

        // 토큰 전송할 NFT 정보를 가져옴
        const fromNFTData = await nft.findOne({
            where: {id: nftId}
        });

        const {userId} = fromNFTData;

        // NFT 전송
        erc721.sendToken(userId, toUserData.userId, nftId);
         
        res.status(StatusCodes.OK).json({status: "successful operation"});

    }),

}