require('dotenv').config();
const {sign, verify} = require('jsonwebtoken');

const AUTH_ERROR = { message: 'Authentication Error' };

module.exports={

    generateAccessToken: async (data) => {
        const token = await sign(data, process.env.ACCESS_SECRET, {expiresIn: '1d'})
        return token;
    },

    sendAccessToken: (res, accessToken) => {
        return res.cookie("jwt",accessToken);
    },

    isAuthorized: async (req, res, next) => {    
        const authHeader = req.get('Authorization');
        //console.log(authHeader);

        if (!(authHeader && authHeader.startsWith('Bearer '))) {
            //return res.status(401).json(AUTH_ERROR);
            return false;
        }

        const token = authHeader.split(' ')[1];
        return verify(token, process.env.ACCESS_SECRET);
        
    }
}