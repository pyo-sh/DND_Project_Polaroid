const Sequelize = require('sequelize');
const db = require('../database/db');
const favoriteFolder = require('./favoriteFolder');
const follow = require('./follow');

const User = db.sequelize.define(
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
User.hasMany(favoriteFolder, {foreignKey : 'ID', sourceKey: 'ID' });
User.hasMany(follow, {foreignKey : 'followID', sourceKey: 'ID'});
User.hasMany(follow, {foreignKey : 'followerID', sourceKey: 'ID'});

module.exports = User;