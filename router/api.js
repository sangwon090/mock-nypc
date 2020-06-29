module.exports = (app, config) => {
    const account = require('../db/models/account');
    const passport = require('passport');

    app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login/?error=3',
        failureFlash: false
    }));

    app.post('/api/register', (req, res) => {
        if(req.isAuthenticated()) {
            return next();
        }

        const username_regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,20}$/g;
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        console.log(req.body);

        if(!req.body.username || !req.body.email || !req.body.password || !req.body.password2) {
            // Abnormal access
            res.redirect('/register/?error=1');
        } else if(!username_regex.test(req.body.username)) {
            res.redirect('/register/?error=2');
        } else if(!email_regex.test(req.body.email)){
            res.redirect('/register/?error=3');
        } else if(req.body.password != req.body.password2) {
            res.redirect('/register/?error=4');
        } else if(req.body.password.length < 8) {
            res.redirect('/register/?error=5');
        } else if(req.body.agreed != 'true') {
            // Abnormal access
            res.redirect('/register/?error=6');
        } else {
            const new_account = new account({
                username: req.body.username,
                email: req.body.email,
                bio: req.body.bio
            });
            account.register(new_account, req.body.password, (err, user) => {
                if(err) {
                    res.redirect('/register/?error=7');
                } else {
                    res.redirect('/login/');
                }
            });
        }
    });
};