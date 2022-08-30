'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // define association here
        }
    }
    user.init(
        {          
            userName: {
                type:DataTypes.STRING(100),
                allowNull: false,
            },
            password: {
                type:DataTypes.STRING(100),
                allowNull: false, 
            },
            address: {
                type:DataTypes.STRING(300),
                allowNull: true,
            },
            tokenAmount: {
              type:DataTypes.INTEGER(100),
              allowNull: false,
              defaultValue: 0
            },
            ethAmount: {
              type:DataTypes.INTEGER(100),
              allowNull: false,
              defaultValue: 0
            },
            mnemonicWord:{
              type: DataTypes.STRING(300),
              allowNull: true,
            },
            privateKey: {
              type: DataTypes.STRING(300),
              allowNull: true,
            },            
            createdAt: {
              type: Sequelize.DATE,
              field: "createdAt",
            },
            
        },
        {
          sequelize,
          tableName: "users",
          timestamps: true,
          updatedAt: false,
          
        }
    );
    user.associate = function (models) {
        user.hasMany(models.post,{
            foreignKey: "userId",
            sourceKey: "id",
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        user.hasMany(models.comment,{
            foreignKey: "userId",
            sourceKey: "id",
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    };
    return user;
};