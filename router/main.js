module.exports = (app, config) => {
    app.get('/', (req, res) => {
        res.render('index', {
            title: config.title,
            logined: true
        });
    });
}