const express = require('express');
const MyPage = express.Router();

const Intro = require('../models/Intro');

MyPage.get('/:userID', (req, res) => {
    console.log(req.params.userID);
    const userID = req.params.userID
    Intro.findOne({
        where :{
            ID : userID
        }
    })
    .then(user => {
        if(user === null){
            console.log('유저가 없습니다.')
        }
        else {
            res.json(user);
        }
    })
})

MyPage.post('/edit', (req, res) => {
    console.log(req.body);
    const user = {
        ID : req.body.ID,
        introduce : req.body.introduce,
        nickname : req.body.nickname
    }
    Intro.findOne({
        where : {
            ID : user.ID,
        }
    })
    .then(targetUser => {
        if (targetUser === null) {
            Intro.create(user).then(res => {
                console.log(res);
            })
            .catch(err => console.error(err));
            console.log('유저 생성 완료!');
            return res.send('업데이트 완료');
        } else {
            console.log(targetUser);
            targetUser.update({
                introduce : user.introduce,
                nickname: user.nickname
            });
            console.log('업데이트 되었습니다.');
            return res.send('업데이트 완료!');
        }
    })
})

module.exports = MyPage;