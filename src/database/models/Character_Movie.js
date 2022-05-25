module.exports = (sequelize, dataTypes) =>{
    let alias = "Character_Movie";
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },

        id_character: {
            type: dataTypes.INTEGER,
        },

        id_movie:{
            type: dataTypes.INTEGER,
        }
       
    };

    let config = {
        tableName : "characters_movies",
        timestamps : false 
    }
    
    const Character_Movie = sequelize.define (alias,cols,config);

    Character_Movie.associate = function(models){
        
        Character_Movie.belongsTo(models.Character, {
            as: "characters",
            foreignKey: "id_character"
        }),

        Character_Movie.belongsTo(models.Movie, {
            as: "movies",
            foreignKey: "id_movie"
        })
       
    }

    return Character_Movie;
}