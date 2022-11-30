const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Operation = sequelize.define('operations',{
    id_operations :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    
    id_client:{
        type:DataTypes.INTEGER,
        
    },
    amount:{
        type:DataTypes.DECIMAL
    },
    commission:{
        type:DataTypes.DECIMAL
    },
    type:{
        type:DataTypes.STRING
    },
    currency:{
        type:DataTypes.STRING
    },
    created:{
        type:DataTypes.DATE
    }
},{
    timestamps: false
})

module.exports = Operation;