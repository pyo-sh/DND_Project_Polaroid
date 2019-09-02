const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'user',
    {
        ID : {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        PASSWORD: {
            type: Sequelize.STRING,
        },
        email : {
            type: Sequelize.STRING,
        },
        nickname : {
            type: Sequelize.STRING,   
        },
        introduce: {
            type: Sequelize.STRING,
        },
        follow : {
            type: Sequelize.INTEGER,
        },
        follower : {
            type: Sequelize.INTEGER,   
        },
        grade: {
            type : Sequelize.STRING
        },
        film : {
            type : Sequelize.INTEGER
        },
        created: {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)