import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

//POST /signup 회원가입
//PRAM username, password, address, tokenAmount, ethAmount, mnemonic, privateKey

export const join = async (username, password) => {
    return await axios.post(`${API_URL}/signup`, {

        username,
        password,
    });
};

//POST /auth/login 로그인
export const login = async (username, password) => {
    const { data } = await Axios.post(`${API_URL}/login`, {
        username,

        password,
    });
    console.log(data);
    //data { token, username }
    if (data?.accessToken) {
        localStorage.setItem('token', data.accessToken);
    }
    return data;
};

//GET /logout 로그아웃
export const logout = () => {
    //토큰 삭제하면 될듯. 호출한 곳에서 로그아웃&페이지 이동처리
    localStorage.removeItem("user");    
};

//GET /auth/{userID} 회원정보 조회
export const myInfo = async (userID) => {
    return await Axios.get(`${API_URL}/user/${userID}`);    
};

//POST /auth/{addr} 무료로 이더 받기(faucet)
export const faucet = async (addr) => {
    return await Axios.post(`${API_URL}/user/${addr}`);
}

export const authHeader = () => {
    const user = localStorage.getItem("user");

    if (user && user.accessToken) {
        return { "access-token": user.accessToken };
    } else {    
        return {};
    }
};

export const Axios = axios.create({
    headers: authHeader(),
});
