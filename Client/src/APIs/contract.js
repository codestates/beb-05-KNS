import { Axios } from './auth';

const API_URL = process.env.REACT_APP_SERVER_URL;

//POST /nft 새로운 NFT 생성
export const mintNFT = async (data) => {
    return await Axios.post(`${API_URL}/nft`, {
        data,
        // userId*	integer($int64)
        // tokenId*	string
        // tokenName*	string
        // desc	string
        // tx_hash	string
        // tokenURI*	string
        // img*	string
    });
};

//GET /nft 전체 NFT 정보 가져오기
export const getNFTList = () => {
    return Axios.get(`${API_URL}/nft`);
};

//GET /{userId} MYNFT 정보 가져오기
export const getMyNftList = async (userId) => {
    return await Axios.get(`${API_URL}/nft/${userId}`);
};

//GET /nft/{nftId} NFT 정보 가져오기
export const getNFTInfoDetail = async (nftId) => {
    return await Axios.get(`${API_URL}/nft/${nftId}`);
};

//PUT /nft/{nftId} NFT 정보 구매
export const buyNFT = async (nftId,userId,price) => {
    return await Axios.put(`${API_URL}/nft/${nftId}/buy`, {
        userid: userId, //나 자신이 구매 - 대리구매?
        price: price,
    });
};
//PUT /nft/{nftId} NFT 전달
export const transferNFT = async (nftId,targetAddr) => {
    return await Axios.put(`${API_URL}/nft/${nftId}/transfer`, {
        nftid: nftId,
        targetaddr: targetAddr,
    });
};

//GET /token/{userId} 사용자 아이디로 토큰 수량 가져오기
export const getTokenbal = async (userId) => {
    return await Axios.get(`${API_URL}/token/${userId}`);
};
//PUT /token/{userId}/transfer ERC20 토큰 전송
export const sendToken = async (userId, targetId, tAmount) => {
    return await Axios.put(`${API_URL}/token/${userId}`, {
        targetid: targetId,
        tokenamount: tAmount,
    });
};

//faucet 은 user API에 있음