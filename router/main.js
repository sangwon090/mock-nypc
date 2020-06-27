module.exports = (app, config, rootPath) => {
    const fs = require('fs');

    app.get('/', (req, res) => {
        res.render('home', {
            title: config.title,
            logined: false
        });
    });

    app.get('/notice', (req, res) => {
        res.render('notice', {
            title: config.title,
            logined: false,
            data: []
        });
    });

    app.get('/login', (req, res) => {
        // TODO: 이미 로그인 되었으면 홈으로 리다이렉트
        res.render('login', {
            title: config.title,
            logined: false
        });
    });

    app.get('/register', (req, res) => {
        // TODO: 이미 로그인 되었으면 홈으로 리다이렉트
        let tos = fs.readFileSync(rootPath + '/docs/terms_of_service.txt').toString();
        let pri = fs.readFileSync(rootPath + '/docs/privacy_policy.txt').toString();
        let error = '';

        if(req.query.error == 1) error = '입력하지 않은 항목이 있습니다.';
        else if(req.query.error == 2) error = '닉네임이 올바르지 않습니다.\\n(한글/영문/기호 5~20자)';
        else if(req.query.error == 3) error = '이메일이 올바르지 않습니다.';
        else if(req.query.error == 4) error = '패스워드가 일치하지 않습니다.';
        else if(req.query.error == 5) error = '패스워드가 너무 짧습니다.';
        else if(req.query.error == 6) error = '이용약관을 동의하지 않으셨습니다.';

        res.render('register', {
            title: config.title,
            logined: false,
            tos: tos,
            pri: pri,
            error: error
        });
    })
};