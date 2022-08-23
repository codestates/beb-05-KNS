const {post, user, nft} = require('../models');

const {isAuthorized} = require('./webToken')
//const {mintToken} = require('./smartContract')
const {asyncWrapper} = require("../errors/async");
const CustomError = require("../errors/custom-error");
const StatusCodes = require("http-status-codes");
const { getEth } = require("../contracts/eth");

module.exports = {
    
    // User ID를 받아 마이페이지에서 유저의 상세 정보 응답
    getUserById: asyncWrapper(async (req, res) => {
        const userId = req.params.userId;

        if (userId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        // 전달받은 id를 가진 user를 찾아옴
        const userData = await user.findOne({
            where: {id: userId},
        });
       
        // 해당 id를 가진 user 없으면 에러 응답
        if (!userData) {
            // 404 not found
            throw new CustomError(`유저 정보가 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
        }
        const {id, userName, createdAt, address, tokenAmount, ethAmount, 
               mnemonicWord, privateKey} = userData;
        
        res.status(200).json({
            status: "successful operation",
            data: {
                id,
                userName,
                createdAt,
                address,
                tokenAmount,
                ethAmount,
                mnemonicWord,
                privateKey
            },
        });
    }),
    
    // User ID를 받아서 마이페이지에서 유저의 게시글 정보 응답
    getPostByUserId: asyncWrapper(async (req, res) => {
        
        if (req.params.userId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        // 전달받은 user Id를 가진 post를 찾아옴
        const postData = await post.findOne({
            where: {userId: req.params.userId},
        });
        
        // 해당 user Id를 가진 post 없으면 조회할 데이터가 없음을 응답
        if (!postData) {
            // 404 not found
            throw new CustomError(`조회할 게시글 정보가 없습니다.`, StatusCodes.NOT_FOUND);
        }

        const {id, userId, title, content, img, hit, like, createdAt} = postData;
        
        res.status(200).json({
            status: "successful operation",
            data: {
                id,
                userId,
                title,
                content,
                img,
                hit,
                like,
                createdAt
            },
        });
    }),

    // User ID를 받아서 마이페이지에서 유저의 NFT 정보 응답
    getNFTByUserId: asyncWrapper(async (req, res) => {
       
      if (req.params.userId === undefined) {
          throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
      }
      // 전달받은 user Id를 가진 nft를 찾아옴
      const nftData = await nft.findOne({
          where: {userId: req.params.userId},
      });
      
      // 해당 user Id를 가진 nft 없으면 조회할 데이터가 없음을 응답
      if (!nftData) {
          //404 not found
          throw new CustomError(`조회할 NFT 정보가 없습니다.`, StatusCodes.NOT_FOUND);
      }

      const {id, userId, tokenId, tokenName, desc, tokenURI, img, createdAt,
             price, prevUserId} = postData;
      
      res.status(200).json({
          status: "successful operation",
          data: {
              id,
              userId,
              tokenId,
              tokenName,
              desc,
              tokenURI,
              img,
              createdAt,
              price,
              prevUserId
          },
      });
  }),

  // 무료로 0.1 이더 받기(faucet)
  getEthFaucet : asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const faucetEthAmount = 0.1;

    if (userId === undefined) {
        throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
    }

    // 전달받은 id를 가진 user를 찾아옴
    const userData = await user.findOne({
      where: {id: userId},
    });
    if (!userData) {
        // 404 not found
        throw new CustomError(`유저 정보가 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
    }

    const {address} = userData; //주소를 가져온다.

    const user = getEth(address, userId); // 이더 요청
    res.status(200).send({ user });
    
    /* await userData.update({
      ethAmount : ethAmount + faucetEthAmount
    }); */
    //res.status(StatusCodes.OK).json({status: "successful operation" });
  }),

}