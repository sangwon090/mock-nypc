const config = require('./config');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connection;
const main_router = require('./router/main')(app, config);
const api_router = require('./router/api')(app, config);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/static', express.static('static'));
app.use((err, req, res, next) => {
    if(err) {
        res.render('error', {
            showError: config.showError,
            error: err
        });
    }
});

const server = app.listen(config.server.port, () => {
    console.log(`[i] mock-nypc 서버가 포트 ${config.server.port}에서 시작되었습니다.`);
});

db.on('error', console.error);
db.once('open', () => {
    console.log(`[i] mongodb 서버에 연결했습니다.`);
})

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});