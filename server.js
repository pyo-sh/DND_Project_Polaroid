const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const passport = require('passport');
const Users = require('./routes/Users');

const optionsForHTTPS = {
    key: fs.readFileSync('config/key.pem','utf8'),
    cert: fs.readFileSync('config/server.crt','utf8'),
}
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

app.get('/', (req, res) => {
    res.send('홈 입니다.');
})

app.use('/user', Users);

app.get('/file/photos', (req, res) => {
   let photos = [];
   let fileCount;
   fs.readdir('frontend/src/img/photo', (err, files) => {
       console.log(files);
       fileCount = files.length;
       console.log(fileCount);
   for(let i = 0; i < fileCount; i++){
        photos.push(`photo${i}.jpg`);
   }
   res.json({
    photos
   });
});
})


https.createServer(optionsForHTTPS, app).listen(port, () => {
    console.log("HTTPS server listening on port " + port);
})