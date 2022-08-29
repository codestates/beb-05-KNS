import { Axios } from './auth';
import {getHeaders} from './token';

const API_URL = process.env.REACT_APP_SERVER_URL;

//POST /nft 새로운 NFT 생성
export const mintNFT = async (data) => {
    return await Axios.post(`${API_URL}/nft`, {
        data
    },{
        headers: getHeaders()
    });
};

//GET /nft 전체 NFT 정보 가져오기
export const getNFTList = () => {
    return Axios.get(`${API_URL}/nft`);
};

//GET /{userId} MYNFT 정보 가져오기
export const getMyNftList = async (userId) => {
    return await Axios.get(`${API_URL}/user/${userId}/nft`);
};

//GET /nft/{nftId} NFT 정보 가져오기
export const getNFTInfoDetail = async (nftId) => {
    return await Axios.get(`${API_URL}/nft/${nftId}`);
};

//PUT /nft/{nftId} NFT 정보 구매
export const buyNFT = async (nftId) => {
    console.log('헤더', getHeaders());
    return await Axios.put(`${API_URL}/nft/${nftId}/buy`,{},
        {
            headers: getHeaders()
        }
    );
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
export const sendToken = async (userId, targetAddress, tAmount) => {
    //console.log("ID +" + tAmount);
    return await Axios.put(`${API_URL}/token/${userId}/transfer`, {
        toAddress: targetAddress,
        toTokenAmount: tAmount,
    });
};

//faucet 은 user API에 있음