const db = require('../database/models');




const  characterMovieController={

        create: (req, res) => {

            db.CharacterMovie.create({
                include: [
                    {association: 'movies'},
                    {association: 'characters'}
                ],
                ...req.body
            }).then(characterMovie => {
                return res.status(200).json({
                    data: characterMovie,
                    status: 200,
                    msg: 'relacion  creada'
                })
            }).catch(error => console.log(error))
            
        
    },
    del: async (req, res) => {
        const characterMovie = await db.CharacterMovie.destroy({
            where: {
                id: req.params.id
            }
        })
        try {
            characterMovie?
                res.status(200).json({
                    delete: 'relacion eliminada',
                    status: 200,
                }) :
                res.status(400).json({
                    msg: "no se encuentra la relacion",
                    status: 400
                })

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports =characterMovieController