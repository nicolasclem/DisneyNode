module.exports = (sequelize, dataTypes)=>{
    let alias = 'Movies';
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        image: {
            
            type: dataTypes.STRING,
        },
        title: {

            type: dataTypes.STRING,
        },


        date: {
            
            type: dataTypes.DATE,
        },

        rating: {

            type: dataTypes.INTEGER,
        },

        id_genre: {
            type: dataTypes.INTEGER,
            allowNull:false,
        }
    };

    let config = {
        tableName: 'movies',
        timestamps: false,
    };

    let Movies = sequelize.define(alias, cols, config);

    Movies.associate = function(models){

        Movies.belongsTo(models.Genre, {
            as:'genres',
            foreignKey:'id_genre',
        });

        Movies.belongsToMany(models.Characters, {
            
            as:'characters',
            through:'characters_movies',
            foreignKey:'id_movie',
            otherKey:'id_character',
            timestamps: false,
        })
    
    }

    return Movies;
}