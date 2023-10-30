const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const fileSchema = sequelize.define('Contact', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    tags:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    }
  }, {
    // Other model options go here
    timestamps: false
    
  });
  
module.exports = fileSchema;