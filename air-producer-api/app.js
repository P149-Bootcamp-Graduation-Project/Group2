require('dotenv').config({ path: __dirname+'/.env' });
global.express = require("express");
global.app = express();
const {rd_client} = require('../../nodejs-skelton-main/app/adapters/database/redis');
const {pg_client} = require('../../nodejs-skelton-main/app/adapters/database/postgresql');
const {mongo_client} = require('../../nodejs-skelton-main/app/adapters/database/mongodb');
const { router } = require('../../nodejs-skelton-main/app/routes/routes');
//const swagger = require('./app/libs/swagger/autogen');
const expressSwagger = require('express-swagger-generator')(app);

//Global Variable
global.userIN = null;

app.use(express.json())
//app.set('view engine', 'ejs'); //FOR views Template engine

app.use(router);

app.get('/db', async (req, res) => {
    const redisData = await rd_client.get('latestposts')
    if (redisData) {
        return res.json({source: 'redis', data: JSON.parse(redisData), leo: req.body})
    }
    const data = await pg_client.query('select * from posts')
    await rd_client.set('latestposts', JSON.stringify(data.rows), {EX: 100,NX: true})
    res.json({source: 'pg', data: data.rows, leo: req.body});
});

app.get("/ss", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
});


//app.use("/docs", swagger.Swag_serve, swagger.Swag_setup);


let options = {
    swaggerDefinition: {
        info: {
            description: "Node.js Express API with Swagger",
            title: "Inavitas Örnek Proje",
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            Bearer: {
                description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [{Bearer: []}],
        defaultSecurity: 'Bearer'
    },
    basedir: __dirname, //app absolute path
    files: ['./app/controllers/**/*.js'] //Path to the API handle folder
};


module.exports = expressSwagger(options)
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => console.log(`Server listening on http://${process.env.APP_HOST}:${process.env.APP_PORT}`));

