const { user } = require("../models");
const bcrypt = require("bcrypt");
const ethers = require('ethers');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./webToken');
const {asyncWrapper} = require("../errors/async");
const CustomError = require("../errors/custom-error");
const StatusCodes = require("http-status-codes");

module.exports = {

  signupPost: asyncWrapper (async(req, res) => { //회원가입
    // console.log(req.boby);
    if ( req.body.userName === undefined || req.body.password === undefined ) { //userName과 password가 비어있는 경우 에러
      throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.CONFLICT);
  } else {
      try {
          const {userName,password} = req.body
          const salt = await bcrypt.genSalt(10); //sait값을 만들고
          const cryptPassword=bcrypt.hashSync(password, salt); //비밀번호 암호화
          const foundAccount = await user.findOne({
              where:{userName: req.body.userName}
          });
          if (foundAccount) throw new CustomError("이미 존재하는 아이디 입니다.",StatusCodes.CONFLICT);
          const account = ethers.Wallet.createRandom(); //니모닉 계좌 생성
            // console.log('address:', wallet.address);
          let mnemonic = account.mnemonic.phrase;
            // console.log('mnemonic:', wallet.mnemonic.phrase);
            // console.log('privateKey:', wallet.privateKey);
          const newBody = {
            userName,
            password:cryptPassword, 
            address: account.address, 
            tokenAmount: account.tokenAmount, 
            ethAmount: account.ethAmount,
            mnemonicWord: mnemonic,
            privateKey: account.privateKey,
            createdAt: new Date()
          };
          const newAccount = new user(newBody);
          await newAccount.save();
          res.status(StatusCodes.OK).send({ data: { /*token: token,*/ userName: userName , address: account.address, mnemonic: mnemonic }, message: "회원가입 되었습니다."});
      } catch (err) {
          res.status(400).json({message: err.message});
      }
    }
    // const { userName, password } = req.body;
    // user.findOne({ userName, userName }, (err, user) => {
    //   if(user) { //userName이 존재 한다면
    //     res.send({ "message": "이미 사용중인 Id 입니다.", success: false });
    //   } else { //userName 존재 하지 않는다면 계정 생성과 new니모닉 발급
    //     const salt = Math.random().toString(36).substring(2, 11);
    //     const encryptPw = crypto.SHA256(password + salt).toString();
    //     let mnemonic;
    //     try {
    //       mnemonic = lightwallet.keystore.generateRandomSeed();
    //       lightwallet.keystore.creatrVault({
    //         password: password,
    //         seedPhrase: mnemonic,
    //         hdPathString: "m/0'/0'/0'"
    //       },
    //       function (err, ks) {
    //         ks.keyFromPassword(password, function (err, pwDerivedKey) {
    //           ks.generateNewAddress(pwDerivedKey, 1);

    //           let address = (ks.getAddresses()).toString();
    //           let keystore = ks.serialize();
    //           let prvKey = ks.exportPrivateKey(address, pwDerivedKey);

    //           web3.eth.accounts.wallet.add(prvKey);
              
    //           const user = new user({
    //             userName: userName,
    //             password: encryptPw,
    //             address: address,
    //             tokenAmount: tokenAmount,
    //             ethAmount: ethAmount,
    //             mnemonicWord : mnemonic,
    //             privateKey: prvKey,
    //             createdAt: new Date()
    //           })
    //         })
    //       })
    //       res.status(201).json({ "data": { "mnemonic": "mnemonic", "token": "token", "username":"username" }, "message": "회원가입이 완료되었습니다." });      
    //     } catch(err) {
    //       console.log(err);
    //       res.status(400).send({ "message": "문제가 발생했습니다. 🤪" });
    //     }
    //   }
    // });
  }),

  loginPost: asyncWrapper(async(req, res) => { //로그인
    //userName과 password가 찾을 수없으면 에러를 날린다.
    if(req.body.userName === undefined || req.body.password === undefined) {
      throw new CustomError("올바르지 않은 파라미터 값입니다.",StatusCodes.CONFLICT);
    }
    const {userName, password} = req.body; //body에서 userName과 password를 가지고 온다.
    const cryptPassword=bcrypt.hashSync(password, 10); //비밀번호 암호화
    // console.log(userName,"------",cryptPassword);
    // const decoded = await isAuthorized(req);
    const userInfo = await user.findOne({
      where: {userName: req.body.userName},
    });
    console.log(req.body);
    const validPassword = await bcrypt.compare(password, userInfo.password);
    if (!validPassword) {
      throw new CustomError("존재하지 않는 사용자입니다.",StatusCodes.NOT_FOUND);
    } else {
      const payload = {
        id: userInfo.id,
        userName: userInfo.userName,
        createdAt: userInfo.createdAt
      }
        // sendAccessToken(res, await generateAccessToken(payload));
        // const token = generateAccessToken(payload);
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '1d',});
        console.log(accessToken);
        res.cookie(`Bearer  ${accessToken}`);
        res.status(StatusCodes.OK).json({ accessToken, userName });  
    }
      
    // const { userName, password } = req.body;
    
    // user.findOne({ userName, userName }, (err, user) => { //user에 userId가 존재 하는지 확인
    //   if(!user) { //userName가 같지 않다면
    //     res.status(400).send({ "data": null, "message": "잘못된 사용자 ID 입니다." });
    //   } else { //userName만약 존재하면 password를 복호화 한후
    //     const salt = user.salt;
    //     const encryptPw = crypto.SHA256(password + salt).toString();
    //     // const payload = {
    //     //   userName: user.userName,
    //     //   createdAt: user.createdAt,
    //     // }
    //     // const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: "1d"});
    //     // const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: "3d"});
    
    //     if(user.password === encryptPw) { //password가 같다면 ok
    //       // res.cookie('refreshToken', refreshToken);
    //       res.status(200).json({ "data": { /*"accessToken": accessToken,*/ "token": token, "username":username }, "message": "로그인에 성공하셨습니다." });
    //     } else { //password가 같지 않다면 
    //       res.status(400).send({ "data": null, "message": "잘못된 사용자 비밀번호 입니다." });
    //     }  
    //   }
    // })
  }),

  logoutPost: asyncWrapper(async(req, res) => {
    res.clearCookie('jwt')
    res.status(StatusCodes.OK).send("로그아웃 되었습니다.");
  })
}