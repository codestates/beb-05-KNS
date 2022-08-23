const { user } = require('../models');
const erc20 = require("../contracts/erc20");

const {isAuthorized} = require('./webToken')
const {asyncWrapper} = require("../errors/async");
const CustomError = require("../errors/custom-error");
const StatusCodes = require("http-status-codes");

module.exports = {

    //User ID를 받아서 토큰 수량 응답
    getTokenByUserId: asyncWrapper(async (req, res) => {
      const userId = req.params.userId;
        if (userId === undefined) {
            throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
        }
        //전달받은 user Id를 가진 user를 찾아옴
        const userData = await user.findOne({
            where: {id: userId},
        });
        
        //해당 id를 가진 post 없으면 조회할 데이터가 없음을 응답
        if (!userData) {
            //404 not found
            throw new CustomError(`사용자 ${userId} 가 존재하지 않습니다.`, StatusCodes.NOT_FOUND);
        }

        const {id, tokenAmount} = userData;

        res.status(200).json({
            status: "successful operation",
            data: {
                id,
                tokenAmount
            },
        });
    }),

    //ERC20 토큰 전송
    transferToken : asyncWrapper(async (req, res) => {
      const userId = req.params.userId;
      const {toUserId, toTokenAmount} = req.body;

      if (toUserId === undefined || toTokenAmount === undefined) {
          throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.BAD_REQUEST);
      }

      const toUserData = await user.findOne({
          where: {id: toUserId},
      });
      
      if (!toUserData) {
          //404 not found
          throw new CustomError(`토큰 전송할 사용자 정보가 없습니다.`, StatusCodes.NOT_FOUND);
      }

      // 토큰 전송할 유저 정보를 가져옴
      const fromUserData = await user.findOne({
        where: {id: userId},
      });

      const {tokenAmount} = fromUserData;

      // 보유 토큰보다 더 많이 전송시 메시지
      if(tokenAmount < toTokenAmount) {
          throw new CustomError(`보유 토큰보다 전송할 토큰이 더 많습니다.`, StatusCodes.CONFLICT);
      }

      // 토큰 전송
      //const user = erc20.sendToken(userId, toUserId, toTokenAmount);
       
      res.status(StatusCodes.OK).json({status: "successful operation"});

  }),
}