const sequelize =  require('../../config/squlize');
const { Sequelize, DataTypes } = require('sequelize');

const  Product = sequelize.define('Product', {
    user_id :{
    type: DataTypes.INTEGER,
    allowNull: false
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    
    price: {
    type: DataTypes.INTEGER,
    allowNull: false 
    }
  ,
    stok: {
    type: DataTypes.INTEGER,
    allowNull: false 
    
  }
  ,
    status: {
    type: DataTypes.INTEGER,
    defaultValue:false,
    allowNull:false 
    
  },
  image_url: {
    type: DataTypes.TEXT,
    
  }
  
  });









  module.exports = Product ;
