const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = process.env.PORT || 5000;

// const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');
const Users = require('./routes/Users');
const MyPage = require('./routes/MyPage');
const Ranking = require('./routes/Ranking');
const Film = require('./routes/Film');
const Favorite = require('./routes/Favorite');
const Follow = require('./routes/Follow');
const LikeRanking = require('./routes/LikeRanking');
const Upload = require('./routes/Upload');
const Images = require('./routes/Images');
const ImgLike = require('./routes/ImgLike');
// const AWS = require("aws-sdk");
// AWS.config.loadFromPath(__dirname+ "/config/awsconfig.json");

// const optionsForHTTPS = {
//     key: fs.readFileSync('config/key.pem','utf8'),
//     cert: fs.readFileSync('config/server.crt','utf8'),
// }  // https 해제.
app.use(cors());

require('./config/passport');

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('frontend/src/img/photo'));

// Passport middleware
app.use(passport.initialize());

// //connect flash
// app.use(flash());

app.get('/api', (req, res) => {
    res.send('홈 입니다.');
})

app.use('/api/user', Users);
app.use('/api/mypage', MyPage);
app.use('/api/ranking', Ranking);
app.use('/api/film', Film);
app.use('/api/favorite', Favorite);
app.use('/api/follow', Follow);
app.use('/api/likeranking', LikeRanking);
app.use('/api/upload', Upload);
app.use('/api/images', Images);
app.use('/api/imglike', ImgLike);

app.listen(port, () => {
    console.log(`welcome ${port}`);
})

// https.createServer(optionsForHTTPS, app).listen(port, () => {
//     console.log("HTTPS server listening on port " + port);
// }) https 해제