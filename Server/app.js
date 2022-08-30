const models = require("./models/index.js");
const express = require("express");

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const tokenRoutes = require('./routes/tokenRoute');
const nftRoutes = require('./routes/nftRoute');

const yaml = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./errors/error-handler');

const app = express();
const PORT = 8080;
const {createServerAccount, deployContracts} = require('./serverInit');
const{KNSTokenBytecode, KNSTokenAbi} = require('./contracts/KNSToken');

//const fs = require("fs");
//const https = require("https");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ['GET', 'POST', 'PUT','DELETE', 'OPTIONS']
    })
);

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', tokenRoutes);
app.use('/', nftRoutes);

const openAPIDocument = yaml.load('./api/openapi.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument));

///무조건 루트 밑에
app.use(errorHandler);

models.sequelize.sync().then( () => {
  app.listen(PORT, async () => {
    console.log(`DB연결 성공 및 ${PORT} 구동중`);
    await createServerAccount();
    //await deployContracts("KNS", KNSTokenAbi, KNSTokenBytecode);
    
  });

    /* if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
        const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
        const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
        const credentials = { key: privateKey, cert: certificate };
        server = https.createServer(credentials, app);
    } else {
        console.log("error!!!")
    } */

}).catch(err => {
    console.log("연결 실패");
    console.log(err);
})