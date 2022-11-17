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
        type:DataTypes.INTEGER
    },
    commission:{
        type:DataTypes.DECIMAL
    },
    type:{
        type:DataTypes.STRING
    }
},{
    timestamps: false
})

module.exports = Operation;