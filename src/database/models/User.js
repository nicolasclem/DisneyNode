module.exports = (sequelize, dataTypes) =>{
    let alias = "User";
    let cols = {

        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,

        },

        name: {
            type: dataTypes.STRING(45),
            
        },

        email: {
            type: dataTypes.STRING(45),
            unique: true
        },


        password: {
            type: dataTypes.STRING(255), 
        }

    };

    let config = {
        tableName : "users",
        timestamps :false
    }
    
    const User = sequelize.define (alias,cols,config);

    return User;
}