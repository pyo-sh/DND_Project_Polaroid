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
Images.get('/getOneImg/:imgID', (req, res) => {
    console.log(req.params)
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
    console.log("여기 실행");
    const { imgID, userID } = req.body;
    imgDownload.findOne({
        where : {
            imgID,
            userID
        }
    }).then(result => {
        console.log(result + "result");
        if(!result) {
            imgDownload.create({imgID, userID})
        }
    })

})


module.exports = Images;