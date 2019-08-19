const Sequelize = require('sequelize');
const db = require('../database/db');
const user = require('./User');

const intro  = db.sequelize.define(
    'intro',
    {
        ID : {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        nickname : {
            type : Sequelize.STRING,
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
        }
    },
    {
        timestamps: false
    }
)

intro.hasOne(user, {foreignKey: 'ID', sourceKey: 'ID'});

module.exports = intro;