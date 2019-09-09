const Sequelize = require('sequelize');
const db = require('../database/db');

const favorite = db.sequelize.define(
    'favorite',
    {
        favFolderNum: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        favName : {
            type: Sequelize.STRING,
            primaryKey : true,
        }
    },
    {
        timestamps: false
    }
)

module.exports = favorite;