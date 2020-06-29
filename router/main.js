module.exports = (app, config, rootPath) => {
    const fs = require('fs');

    app.get('/', (req, res) => {
        res.render('home', {
            title: config.title,
            logined: req.isAuthenticated()
        });
    });

    app.get('/notice', (req, res) => {
        res.render('notice', {
            title: config.title,
            logined: req.isAuthenticated(),
            data: []
        });
    });

    app.get('/login', (req, res) => {
        if(req.isAuthenticated()) {
            res.redirect('/');
        } else {
            let error = '';
            
            if(req.query.error == 1) error = '이메일이 입력되지 않았습니다.';
            if(req.query.error == 2) error = '패스워드가 입력되지 않았습니다.';
            if(req.query.error == 3) error = '이메일 또는 패스워드가 올바르지 않습니다.';
    
            res.render('login', {
                title: config.title,
                logined: req.isAuthenticated(),
                error: error
            });
        }
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/register', (req, res) => {
        if(req.isAuthenticated()) {
            res.redirect('/');
        } else {
            let tos = fs.readFileSync(rootPath + '/docs/terms_of_service.txt').toString();
            let pri = fs.readFileSync(rootPath + '/docs/privacy_policy.txt').toString();
            let error = '';

            if(req.query.error == 1) error = '입력하지 않은 항목이 있습니다.';
            else if(req.query.error == 2) error = '닉네임이 올바르지 않습니다.\\n(한글/영문/기호 5~20자)';
            else if(req.query.error == 3) error = '이메일이 올바르지 않습니다.';
            else if(req.query.error == 4) error = '패스워드가 일치하지 않습니다.';
            else if(req.query.error == 5) error = '패스워드가 너무 짧습니다.';
            else if(req.query.error == 6) error = '이용약관을 동의하지 않으셨습니다.';
            else if(req.query.error == 7) error = '계정이 이미 존재합니다.';

            res.render('register', {
                title: config.title,
                logined: req.isAuthenticated(),
                tos: tos,
                pri: pri,
                error: error
            });
        }
    });
};