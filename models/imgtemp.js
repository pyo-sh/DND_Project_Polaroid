const Sequelize = require('sequelize');
const db = require('../database/db');
const imgLiked = require('./imgLiked');

const imgtemp = db.sequelize.define(
    'imgtemp',
    {
        imgID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true,
        },
        imgName : {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false
    }
)

imgtemp.hasMany(imgLiked, {foreignKey : 'imgID', sourceKey: 'imgID'});

module.exports = imgtemp;