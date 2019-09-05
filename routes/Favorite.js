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


Favorite.post('/getAll', (req, res) => {
    const ID = req.body.ID;  // 아이디를 받아서 그 사람의 모든 폴더네임과 이미지네임을 출력해준다.
    favoriteFolder.findAll({attributes:['favFolderName'],
    include: [{model: favorite, attributes : ['favName']}], where : {
        ID
    }})
    .then(folder => {
        res.json(folder);
    })
})

module.exports = Favorite;