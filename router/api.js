module.exports = (app, config) => {
    app.post('/api/register', (req, res) => {
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
            res.redirect('/');
        }
    });
};