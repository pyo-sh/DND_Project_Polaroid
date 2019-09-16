const Sequelize = require('sequelize');
const db = require('../database/db');
const imgLiked = require('./imgLiked');

const image = db.sequelize.define(
    'image',
    {
        imgID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true,
        },
        imgName : {
            type: Sequelize.STRING,
        },
        imgType : {
            type: Sequelize.STRING,
        },
        imgUrl : {
            type: Sequelize.STRING
        },
        category : {
            type: Sequelize.STRING
        },
        tag : {
            type: Sequelize.STRING
        },
        distribute : {
            type : Sequelize.STRING
        },
        price : {
            type : Sequelize.INTEGER
        },
        commercialAvailable : {
            type: Sequelize.STRING
        },
        copyrightNotice : {
            type: Sequelize.STRING
        },
        noChange : {
            type: Sequelize.STRING
        }, 
        visibility : {
            type: Sequelize.STRING
        },
        userID : {
            type : Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)

image.hasMany(imgLiked, {foreignKey : 'imgID', sourceKey: 'imgID'});

module.exports = image;