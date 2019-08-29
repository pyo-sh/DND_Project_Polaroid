const express = require('express');
const Raking = express.Router();

const User = require('../models/User');

Raking.get('/', (req, res) => {
    console.log('겟랭킹');
    User.findAll({order : [['follower','DESC']], limit : 5})
    .then(user => {
        if(user === null){
            console.log('유저가 없습니다.')
        }
        else {
            const rankUser = JSON.stringify(user);
            const parseUser = JSON.parse(rankUser);
            let array = [];
            parseUser.forEach(user => {
                  const userNickname = user.nickname;
                  const userfollower = user.follower; 
                  const userInfo = {
                      userNickname,
                      userfollower
                  }
                  array = [...array, userInfo];
            })
            res.json(array);
        }
    })
})

module.exports = Raking;