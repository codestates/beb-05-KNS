'use strict';
const { Model } = require('sequelize');
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
        }
    }
    post.init(
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            content: {
                type: DataTypes.STRING(3000),
                allowNull: true,
            },
            img: {
                type: DataTypes.STRING(255),
                allowNull: true,
                },
            
            hit: {
                type:DataTypes.INTEGER(30),
                allowNull: true, 
                defaultValue: 0
            },
            like: {
                type:DataTypes.INTEGER(30),
                allowNull: true, 
                defaultValue: 0
            },
            createdAt: {
                type: Sequelize.DATE,
                field: "created_at",
            },
        },
        {
            sequelize,
            modelName: 'post',
            timestamps: true,
            updatedAt: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );


    post.associate = function (models) {
        post.belongsTo(models.user, {
            foreignKey: "userId",
            targetKey: "id",
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
        post.hasMany(models.comment,{
            foreignKey: "postId",
            sourceKey: "id",
            onDelete: 'cascade',
            onUpdate: 'cascade'});
    };
    return post;
};