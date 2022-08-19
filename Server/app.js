const models = require("./models/index.js");
const express = require("express");

const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const yaml = require("yamljs");
const swaggerUI = require("swagger-ui-express");

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const fs = require("fs");
//const https = require("https");
//const errorHandler = require('./errors/error-handler')

const app = express();
const PORT = 4000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ['https://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS']
    })
);

app.use('/user', userRoutes);
app.use('/post', postRoutes);

const openAPIDocument = yaml.load('./api/openapi.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument));

///무조건 루트 밑에
//app.use(errorHandler)

models.sequelize.sync().then( () => {
  app.listen(8000, async () => {
    console.log(`DB연결 성공 및 port 구동중`);
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