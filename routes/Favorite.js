const express = require('express');
const Favorite = express.Router();
const Sequelize = require('sequelize');
const favoriteFolder = require('../models/favoriteFolder');
const favorite = require('../models/favorite');
const db = require('../database/db');

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
    const imgID = req.body.info.imgID;
    favorite.create({
        favFolderNum,
        imgID
    })
})


// Favorite.post('/getAll', (req, res) => {
//     const ID = req.body.ID;  // 아이디를 받아서 그 사람의 모든 폴더네임과 이미지네임을 출력해준다.
//     favoriteFolder.findAll({attributes:['favFolderName'],
//     include: [{model: favorite, attributes : ['favName']}], 
//     where : {
//         ID
//     }})
//     .then(folder => {
//         res.json(folder);
//     })
// })

// Favorite.post('/getAll2', (req, res) => {
//     const ID = req.body.ID;  // 아이디를 받아서 그 사람의 모든 폴더네임과 이미지네임을 출력해준다.
//     favorite.findAll({
//     include: [{model: favoriteFolder}], 
//     where : {
//         ID
//     }})
//     .then(folder => {
//         res.json(folder);
//     })
// })
Favorite.post('/getAll',(req, res) => {
    const { userID } = req.body
    let query = `SELECT a.favFolderNum, a.favFolderName, b.imgID, c.imgName FROM favoriteFolders a LEFT join favorites b ON a.favFolderNum = b.favFolderNum LEFT JOIN images c ON b.imgID = c.imgID  WHERE a.ID = "${userID}" ORDER BY favFolderNum`;
    db.sequelize.query(query).then(([results, metadata]) => {
        res.send(results)
    })
})


Favorite.post('/delFavFolder', (req, res) => {
    const { favFolderNum } = req.body;
    favoriteFolder.destroy({
        where : {
            favFolderNum
        }
    })
})

Favorite.post('/delFavorite', (req, res) => {
    const { favNumFolderNum, imgID }  = req.body;
    favorite.destroy({
        where: {
            favNumFolderNum,
            imgID
        }
    })
})

Favorite.post('/isFav', (req, res) => { // 해당 유저한테 해당 이미지가 즐겨찾기 된 이미지인지 아닌지 알기 위한 함수.
    const { userID, imgID } = req.body;
    let query = `SELECT * FROM favorites WHERE favFolderNum IN (SELECT favFolderNum FROM favoriteFolders WHERE ID = "${userID}") AND ImgID = ${imgID};`
    db.sequelize.query(query).then(([results, metadata]) => {  // 결과가 없으면 false 반환, 있으면 true 반환
        if(results[0] === undefined){ // 결과가 없으면 [] 이 나와서 그 배열의 [0]이 없으면으로 설정했음
            res.send(false);
        }
        else {  // 첫번째 배열이 있으면 true
            res.send(true);
        }
    })
})

module.exports = Favorite;