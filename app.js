const config = require('./config');
const express = require('express');

const app = express();
const router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/static', express.static('static'));

const server = app.listen(config.server.port, () => {
    console.log(`[i] mock-nypc 서버가 포트 ${config.server.port}에서 시작되었습니다.`);
});