module.exports = function (sequelize, dataTypes) {
    let alias = 'CharacterMovie';
    let cols ={
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_character:{
            type: dataTypes.INTEGER,
            
        },

        id_movie:{
            type: dataTypes.INTEGER,
        }
    };

    let config ={
        tableName: 'characters_movies',
        timestamps: false
    };

    let CharacterMovie = sequelize.define(alias, cols, config);

    CharacterMovie.associate = function(models){

        CharacterMovie.belongsTo(models.Characters,{
        as: 'characters',
        foreignKey: 'id_character'
    }),

    CharacterMovie.belongsTo(models.Movies,{
        as: 'movies',
        foreignKey: 'id_movie'
    })

        }
        return CharacterMovie;

}