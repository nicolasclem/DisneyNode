module.exports = (sequelize, dataTypes) =>{
    let alias = "Movie";
    let cols = {

        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,

        },

        image: {
            type: dataTypes.STRING(45),
            
        },
        title: {
            type: dataTypes.STRING(45),
            
        },

        date: {
            type: dataTypes.DATE,
        },

        rating: {
            type: dataTypes.INT,
        },

        id_genre:{
            type: dataTypes.INT,
        }

        
    };

    let config = {
        tableName : "movies",
        timestamps :false
    }
    
    const Movie = sequelize.define (alias,cols,config);

    Movie.associate = function(models){
        
        Movie.belongsTo(models.Genre, {
            as: "genres",
            foreignKey: "id_genre"
        }),
        Movie.belongsToMany(models.Character,{
            as:"characters",
            through:"characters_movies",
            foreignKey:"id_movie",
            otherKey:"id_character"
        })
        
    }

    return Movie;
}