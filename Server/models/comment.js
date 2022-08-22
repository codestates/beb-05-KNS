'use strict';
const { Model, Sequelize } = require('sequelize');
// const { board } = require('./board');
module.exports = (sequelize, DataTypes) => {
    class comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
        }
    }
    comment.init(
        {
            userName: {
                type:DataTypes.STRING(100),
                allowNull: true, 
            },
            content: {
                type:DataTypes.STRING(1000),
                allowNull: false, 
            },
            createdAt: {
                type: Sequelize.DATE,
                field: "createdAt",
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: "updatedAt",
            },
        },
        {
            sequelize,
            modelName: 'comment',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );

    comment.associate = function(models){
        comment.belongsTo(models.post, {
            foreignKey: "postId",
            targetKey: "id",
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        comment.belongsTo(models.user, {
            foreignKey: "userId",
            targetKey: "id",
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
    };

    return comment;
};