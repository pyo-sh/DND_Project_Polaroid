const express = require('express');
const Favorite = express.Router();
const Sequelize = require('sequelize');
const favoriteFolder = require('../models/favoriteFolder');
const favorite = require('../models/favorite');


Favorite.post('/', (req, res) => {
    const ID = req.body.userID;
    favoriteFolder.findAll({
        where : {
            ID
        }
    })
    .then(folder => {
        res.json(folder);
    })
})

Favorite.post('/addFolder', (req, res) => { // 코인 충전 했을 때 코인을 충전한 금액의 /100 만큼 충전.
    const ID = req.body.info.ID;
    const favFolderName = req.body.info.folderName;
    const temp = {
        ID,
        favFolderName
    }
    favoriteFolder.create({
       ID : temp.ID,
       favFolderName : temp.favFolderName
    })
    .then(folder => {
        res.json(folder);
    })
})

Favorite.post('/addPhotoInFolder', (req, res) => {
    const favFolderNum = req.body.info.folderNum;
    const photo = req.body.info.photo;
    favorite.create({
        favFolderNum,
        favName : photo
    })
})

module.exports = Favorite;