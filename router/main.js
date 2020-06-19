module.exports = (app, config) => {
    app.get('/', (req, res) => {
        res.render('home', {
            title: config.title,
            logined: false
        });
    });

    app.get('/login', (req, res) => {
        // TODO: 이미 로그인 되었으면 홈으로 리다이렉트
        res.render('login', {
            title: config.title,
            logined: false
        });
    });
};