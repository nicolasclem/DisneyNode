module.exports = (sequelize, dataTypes) =>{
    let alias = "Character";
    let cols = {

        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,

        },

        image: {
            type: dataTypes.STRING(45),
            
        },
        name: {
            type: dataTypes.STRING(45),
            
        },

        age: {
            type: dataTypes.INT,
        },

        weight: {
            type: dataTypes.INT,
        },

        history:{
            type: dataTypes.STRING(255),
        }

        
    };

    let config = {
        tableName : "movies",
        timestamps :false
    }
    
    const Character = sequelize.define (alias,cols,config);

    Character.associate = function(models){
        
        Character.belongsToMany(models.Movie,{
            as:"movies",
            through:"characters_movies",
            foreignKey:"id_character",
            otherKey:"id_movies"
        })
        
    }
    return Character;
}