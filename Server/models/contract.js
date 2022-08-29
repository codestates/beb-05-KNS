'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class contract extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
        }
    }
    contract.init(
        {
            contractAddress: {
                type:DataTypes.STRING(300),
                allowNull: false, //필수값
            },
            type: {
                type:DataTypes.STRING(300),
                allowNull: false, //필수값
            }
        },
        {
            sequelize,
            modelName: 'contract',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );
    contract.associate = (db) => {};
    return contract;
};