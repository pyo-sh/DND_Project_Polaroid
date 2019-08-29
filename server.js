const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

// const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');
const Users = require('./routes/Users');
const MyPage = require('./routes/MyPage');
const Raking = require('./routes/Raking');
const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname+ "/config/awsconfig.json");
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
app.use('/api/raking', Raking);

app.post('/api/file/photos', (req, res) => {
  let photos = [];
  let start = req.body.start;
  let count = req.body.count;
  let isMore = req.body.isMore;
  let fileCount = 0;

  fs.readdir('frontend/src/img/photo', (err, files) => {
    fileCount = files.length;
 
    for(let i = start; i < start + count; i++){
      if(fileCount >= i){
        photos.push(`photo${i}.jpg`);
        
        if (fileCount == i){
          isMore = false;
          break;
        }
      }
    }
    res.json({
     photos, isMore
    });
  });
});

app.post('/api/uploads3',cors(), (req, res) => {
    let s3 = new AWS.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;

    const s3Params = {
        Bucket : "poloapp/images",
        Key : fileName,
        Expires : 500,
        ContentType : fileType,
        ACL : 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            res.json({success:false, error:err});
        }

        const returnData = {
            signedRequest: data,
            url : `https://poloapp.s3.ap-northeast-2.amazonaws.com/images/${fileName}`
        };
        res.json({success:true, data:{returnData}});
    });
})

app.get('/api/uploads3', function(req, res, next) {
});
  
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`welcome ${port}`);
})

// https.createServer(optionsForHTTPS, app).listen(port, () => {
//     console.log("HTTPS server listening on port " + port);
// }) https 해제