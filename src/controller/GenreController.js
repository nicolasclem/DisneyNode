const db = require('../database/models');

const GenreController ={

    show: async (req, res) => {
        const genres= await db.Genre.findAll({
            include: [{
                association: 'movies'    
            }]
        })
        if (genres.length > 0) {
            try {

                const allgenres = genres.map(genre => {
                genre = {
                        name:genre.dataValues.name,
                        image:genre.dataValues.image
                    }
                    return genre;
                })
                res.status(200).json({
                    data: allgenres,
                    msg: "generos  de peliculas  !!"
                })

            } catch (error) {
                console.log(error)
            }
        } else {
            res.status(400).json({

                msg: "no se encuentran generos  de peliculas  !!"
            })
        }

    },
    create: (req, res) => {
        try {
            db.Genre.findOne({
                    where: {
                        name: req.body.name,
                    }
                })
                .then(genre => {
                    if (genre) {
                        return res.status(400).json({
                            character: 'el genero de pelicula  ya existe',
                            error: 400,
                        })
                    } else {
                        db.Genre.create({
                            include: [{
                                association: 'movies'  
                            }],
                                ...req.body,
                                image: req.file.filename,
                            })
                            .then(genre => {
                                return res.status(200).json({
                                    data: genre,
                                    status: 200,
                                    msg: 'genero de pelicula creado'
                                })
                            }).catch(error => console.log(error))
                    }
                }).catch(() =>  res.status(400).json({
                    msg: 'no se pudo crear  el genero de la pelicula!',
                    status:400
                })
            )
        } catch (err) {
            console.log(err)
        }
    }

}
module.exports= GenreController