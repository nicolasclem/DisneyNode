module.exports = (sequelize, dataTypes) =>{
    let alias = "Genre";
    let cols = {

        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,

        },

        name: {
            type: dataTypes.STRING(45),
            
        },

        image: {
            type: dataTypes.STRING(45),
        }

    };

    let config = {
        tableName : "genres",
        timestamps :false
    }
    
    const Genre = sequelize.define (alias,cols,config);

    

    Genre.associate = function(models){
        
        Genre.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "id_genre"
        })
        
    }

    return Genre;
}