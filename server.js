const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express()
app.use(cookieParser());

//basic route for homepage 
app.get('/', (req, res) => {
    res.send('welcome to express app');
});

//Route for adding cookie 
app.get('/login', (req, res) => {
    const user = req.param('user');
    let pwd = req.param('pass');    

    const contents = fs.readFileSync('users.auth.json', 'utf8');
    const userObj = JSON.parse(contents);
    console.log(userObj, user, pwd);
    if (!userObj[user]) {
        res.send('Unauthenticated user');
        return;
    }

    if (userObj[user].password !== pwd) {
        res.send('Unauthenticated user');
        return;
    }
    const saltRounds = 10;
    pwd = bcrypt.hashSync(pwd, saltRounds);

    let token = jwt.sign({
            username: user,
            password: pwd
        },
        'public_key_test', {
            expiresIn: '24h' // expires in 24 hours
        }
    );
    res.cookie("jwttoken", token);
    res.sendFile(path.join(__dirname+'/user.html'));
});

app.get('/sayhi', (req, res) => {
    const token = req.cookies.jwttoken;
    try {
        const payload = jwt.verify(token, 'public_key_test');
        console.log(payload);
    } catch (e) {
        res.send('error' + e);
    }
    res.send('Hi!');
});

//Iterate users data from cookie 
app.get('/getcookies', (req, res) => {
    //shows all the cookies 
    res.send(req.cookies);
});

app.get('/jwtpayload', (req, res) => {
    const token = req.cookies.jwttoken;
    let payload;
    try {
        payload = jwt.verify(token, 'public_key_test');
        res.setHeader('Content-Type', 'application/json');
        
    } catch (e) {
        payload = 'error' + e;
    }
    res.send(payload);
});

//server listens to port 3000 
app.listen(3010, (err) => {
    if (err)
        throw err;
    console.log('listening on port 3010');
});