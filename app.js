const config = require('./config');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
require('./passport');

const app = express();
const db = mongoose.connection;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((err, req, res, next) => {
    if(err) {
        res.render('error', {
            showError: config.showError,
            error: err
        });
    }
});

const main_router = require('./router/main')(app, config, __dirname);
const api_router = require('./router/api')(app, config);

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