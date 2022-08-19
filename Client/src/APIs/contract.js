import { Axios } from './auth';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const getNFTList = () => {
    return Axios.get(`${API_URL}/nft`);
};

export const getMyNftList = async (data) => {
    return await Axios.get(`${API_URL}/nft/mynft`, {
        data,
    });
};

export const mintNFT = async (data) => {
    return await Axios.post(`${API_URL}/nft/mint`, {
        data,
    });
};

export const buyNFT = async (data) => {
    return await Axios.post(`${API_URL}/nft/buy`, {
        data,
    });
};
