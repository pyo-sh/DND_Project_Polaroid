const express = require('express');
const ImgLike = express.Router();
const Sequelize = require('sequelize');
const db = require("../database/db");
const image = require('../models/image');
const imgLiked = require('../models/imgLiked');


ImgLike.get('/getlike/:imgID', (req, res) => { // 라이크 수를 조회한다.
    let { imgID } = req.params;
    let query = `SELECT count(*) likeCount FROM imgLikeds where imgID = ${imgID}`;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.send(results);
    })
})

ImgLike.post('/isGetLike', (req, res) => {
    let { imgID, userID } = req.body;
    imgLiked.findOne({
        where : {
            imgID,
            userID
        }
    })
    .then(results => {
        if(!results) {
            res.send(false)
        }
        else{
            res.send(true)
        }
    })
})
ImgLike.post('/likeup', (req, res) => {  // 라이크 수 1개 증가 -> 이미지라이크 DB에 row를 추가
    let { imgID, userID } = req.body;
    imgLiked.create({ // 이미지 만들어줌.
        imgID,
        userID
    })
    .then(results => {
        res.send('추가 완료');
    })
})

ImgLike.post('/likedown', (req, res) => { // 이미지라이크 db에 row를 destroy
    let { imgID, userID } = req.body;

    imgLiked.destroy({
        where : {
            imgID,
            userID
        }
    }).then(results => {
        res.send('감소 완료');
    })
})


module.exports = ImgLike;