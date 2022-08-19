const express = require("express");
const routes = require("./routes");
const yaml = require("yamljs");
const swaggerUI = require("swagger-ui-express");

const app = express();


const openAPIDocument = yaml.load('./api/openapi.yaml');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument));
app.use("/", routes);

const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, () => {
  console.log(`🚀Server is working on ${PORT}`)
})