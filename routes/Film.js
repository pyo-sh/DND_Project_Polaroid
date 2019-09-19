const express = require('express');
const Film = express.Router();
const Sequelize = require('sequelize');
const User = require('../models/User');


Film.get('/:userID', (req, res) => {
    const id = req.params.userID;
    User.findOne({
        where : {
            ID :id
        }
    })
    .then(user => {
        res.json(user.film);
    })
})

Film.post('/charge', (req, res) => { // 코인 충전 했을 때 코인을 충전한 금액의 /100 만큼 충전.
    const ID = req.body.info.ID;
    const chargeFilm = req.body.info.num;
    User.update({
        film: Sequelize.literal('film +' + chargeFilm)
    }, { where : {
        ID
    }
})
})

Film.post('/minus', (req, res) => {
    const ID = req.body.info.ID;
    const filmNum = req.body.info.filmNum;
    User.update({
        film: Sequelize.literal('film -' + filmNum)
    }, { where : {
        ID 
    }
})
})


module.exports = Film;