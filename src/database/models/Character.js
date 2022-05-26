module.exports = function (sequelize, dataTypes) {
    let alias ='Characters';

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name:{
            type: dataTypes.STRING
        },

        image:{
            type: dataTypes.STRING
        },

        age:{
            type: dataTypes.INTEGER
        },

        weight:{
            type: dataTypes.INTEGER
        },

        history:{
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName:'characters',
        timestamps: false,
        undercode: true
    };

    let Characters = sequelize.define(alias, cols, config);

    Characters.associate = function(models){
        Characters.belongsToMany(models.Movies, {
            
            as:'movies',
            through:'characters_movies',
            foreignKey:'id_character',
            otherKey:'id_movie',
            timestamps: false,
        })
    };

    return Characters;
}