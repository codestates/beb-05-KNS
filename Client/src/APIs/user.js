import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export const login = async (username, password) => {
    const { data } = await Axios.post(`${API_URL}/login`, {
        username,
        password,
    });

    localStorage.setItem('user', data);
    return data;
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const join = (username, password) => {
    return Axios.post(`${API_URL}/join`, {
        username,
        password,
    });
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const Axios = () => {
    //headers 인증정보 설정
    const accessToken = getCurrentUser().accessToken;
    axios.create({
        headers: { "access-token": accessToken },
    });
};
