const express = require('express');
const Images = express.Router();
const Sequelize = require('sequelize');
const db = require("../database/db");
const image = require('../models/image');
const imgDownload = require('../models/imgDownload');

Images.get('/getAllImages', (req, res) => {
    let {start, count} = req.query;
    let query = `SELECT imgID, imgName, imgUrl from images limit ${start}, ${count} `;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.json(results);
    })
})
Images.get('/getAllImagesTag', (req, res) => {
    let {start, count} = req.query;
    let query = `SELECT imgID, imgName, imgUrl, tag from images limit ${start}, ${count} `;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.json(results);
    })
})

Images.get('/getAllImagesCategory', (req, res) => {
    let {start, count} = req.query;
    let query = `SELECT imgID, imgName, imgUrl, tag, category from images limit ${start}, ${count} `;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.json(results);
    })
})

Images.get('/getOneImg/:imgID', (req, res) => {
    let { imgID } = req.params;
    image.findOne({
        where : {
            imgID
        }
    })
    .then(img => {
        res.send(img);
    })
})
Images.get('/getDownloads/:imgID', (req, res) => {
    let { imgID } = req.params;
    
    let query = `SELECT COUNT(*) downCount FROM imgDownloads WHERE imgID = ${imgID}`;

    db.sequelize.query(query).then(([results, metadata]) => {
        res.send(results);
    })
})

Images.post('/plusDownUser', (req, res) => {
    const { imgID, userID, price } = req.body;
    imgDownload.findOne({
        where : {
            imgID,
            userID
        }
    }).then(result => {
        if(!result) {
            imgDownload.create({imgID, userID, filmQnty: price})
        }
    })
})

Images.post('/isDownImage', (req, res) => { // 다운 받은 이미지인가? 다운 받은 이미지면 공짜로 다시 다운 받을 수 있게 해야함.
    const { imgID, userID } = req.body;
    imgDownload.findOne({
        where:{
            imgID,
            userID,
        }
    })
    .then(result => { // 만약 다운 받은 적이 없으면 false 받은적이 있으면 true을 보냄.
        if(!result){
            res.send(false);
        }
        else {
            res.send(true);
        }
    })
})

Images.post('/getBenefitMonth', (req, res) => {
    const { userID } = req.body;
    let query = `
    SELECT imgCount, downCount, sumFilm, uploadMonth Month FROM 
    (SELECT COUNT(*) imgCount, SUBSTRING(uploadDate,1,7) uploadMonth FROM images WHERE userID = "${userID}" GROUP BY SUBSTRING(uploadDate,1,7)) c 
    LEFT JOIN
    (SELECT COUNT(*) downCount, SUM(filmQnty) sumFilm, SUBSTRING(downDate,1,7) beneMonth FROM imgDownloads a, images b WHERE b.userID = "${userID}" 
    AND a.imgID = b.imgID GROUP BY SUBSTRING(downDate,1,7)) d ON uploadMonth = beneMonth`;

    db.sequelize.query(query).then(([results, metaData]) => {
        res.send(results);
    })
})

Images.post('/upImageView', (req, res) => {
    const { imgID }= req.body;

    image.update({
        view : Sequelize.literal('view +' + 1)
    },{
        where : {
            imgID
        }
    })
})

module.exports = Images;