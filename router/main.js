module.exports = (app, config) => {
    app.get('/', (req, res) => {
        res.render('home', {
            title: config.title,
            logined: true
        });
    });
};