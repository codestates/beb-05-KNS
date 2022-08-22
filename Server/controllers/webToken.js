require('dotenv').config();
const {sign, verify} = require('jsonwebtoken');

module.exports={
    generateAccessToken: async (data) => {
        const token = await sign(data, process.env.ACCESS_SECRET, {expiresIn: '1d'})
        return token;
    },
    sendAccessToken: (res, accessToken) => {
        return res.cookie("jwt",accessToken);
    },
    isAuthorized: async (req) => {
        if(req.headers['authorization']){
            const token =req.headers['authorization'].split('jwt=')[1].split(';')[0]
            return verify(token, process.env.ACCESS_SECRET);
        }else{
            return false
        }
    }

}