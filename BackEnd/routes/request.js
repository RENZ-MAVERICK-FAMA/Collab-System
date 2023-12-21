var express = require('express');
const router = express.Router();
const dotenv= require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID="585693082003-bviabtonu1a3qa8gdp74gl7jo4fj4boc.apps.googleusercontent.com"
const CLIENT_SECRET="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"

router.post('/', async function(req,res, next ){

res.header('Access-Control-Allow-Origin','http://localhost:3000');
res.header('Referrer-Policy','no-referrer-when-downgrade');

const redirectUrl ='http://127.0.0.1:5000/oauth';
const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    redirectUrl
);

const authorizeUrl  = oAuth2Client.generateAuthUrl({

    access_type:'offline',
    scope:'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt:'consent'  
});
res.json({url:authorizeUrl}) 

});
module.exports =router;