const express = require('express');
const Images = express.Router();
const Sequelize = require('sequelize');
const db = require("../database/db");
const image = require('../models/image');

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



module.exports = Images;