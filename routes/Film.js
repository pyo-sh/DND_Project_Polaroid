const express = require('express');
const Film = express.Router();
const Sequelize = require('sequelize');
const User = require('../models/User');

Film.post('/charge', (req, res) => { // 코인 충전 했을 때 코인을 충전한 금액의 /100 만큼 충전.
    const id = req.body.info.id;
    const money = req.body.info.money;
    const chargeFilm = money / 100;
    User.update({
        film: Sequelize.literal('film +' + chargeFilm)
    }, { where : {
        ID : id 
    }
})
})

Film.post('/payment', (req, res) => { // 코인 사용 했을 때 코인이 사용한거만큼 깎이게함
    const id = req.body.info.id;
    const payFilm = req.body.info.film;
    User.update({
        film: Sequelize.literal('film -' + payFilm)
    }, { where : {
        ID : id 
    }
})
})


module.exports = Film;