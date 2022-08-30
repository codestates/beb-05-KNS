'use strict';
const { Model, Sequelize, BOOLEAN } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nft extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
        }
    }
    nft.init(
        {
            userId: {
                type:DataTypes.STRING(100),
                allowNull: false,
            },
            tokenId: {
                type:DataTypes.STRING(100),
                allowNull: false,
            },
            tokenName: {
                type:DataTypes.STRING(300),
                allowNull: false,
            },
            desc: {
                type:DataTypes.STRING(300),
                allowNull: true,
            },
            tx_hash: {
                type:DataTypes.STRING(300),
                allowNull: true,
            },
            tokenURI: {
                type:DataTypes.STRING(300),
                allowNull: false, 
            },
            img: {
                type:DataTypes.STRING(300),
                allowNull: true, 
            },
            isBuy: {
                type:DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            price: {
                type:DataTypes.INTEGER(100),
                allowNull: false, 
                defaultValue: 0,
            },
            prevUserId: {
                type:DataTypes.STRING(100),
                allowNull: true, 
            },
            createdAt: {
                type: Sequelize.DATE,
                field: "createdAt",
              },
        },
        {
            sequelize,
            modelName: 'nft',
            timestamps: true,
            updatedAt: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );
    nft.associate = (db) => {};
    return nft;
};