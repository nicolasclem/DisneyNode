const db = require ('../database/models')




const  movieController ={
    show: async (req, res) => {
        const movies= await db.Movies.findAll({
            include: [
                {association: 'characters'},{association:'genres'}   
            ]
        })
        if (movies.length > 0) {
            try {

                const allmovie = movies.map(movie => {
                movie = {
                        title:movie.dataValues.title,
                        date:movie.dataValues.date,
                        image:movie.dataValues.image
                    }
                    return movie;
                })
                res.status(200).json({
                    data: allmovie,
                    msg: "pelicula  encontrada!!"
                })

            } catch (error) {
                console.log(error)
            }
        } else {
            res.status(400).json({

                msg: "Base de Datos sin Peliculas!"
            })
        }

    },
    create: (req, res) => {
        try {
            db.Movies.findOne({
                    where: {
                        title: req.body.title,
                    }
                })
                .then(movie => {
                    if (movie) {
                        return res.status(400).json({
                            character: 'la pelicula ya existe',
                            error: 400,
                        })
                    } else {
                        db.Movies.create({
                            include: [
                                {association: 'characters'},{association:'genres'}    
                            ],
                                ...req.body,
                                image: req.file.filename,
                            })
                            .then(movie => {
                                return res.status(200).json({
                                    data: movie,
                                    status: 200,
                                    msg: 'pelicula creada'
                                })
                            }).catch(error => console.log(error))
                    }
                }).catch(() =>  res.status(400).json({
                    msg: 'no se pudo crear la pelicula!',
                    status:400
                })
            )
        } catch (err) {
            console.log(err)
        }
    },
    del: async (req, res) => {
        const movieDelete = await db.Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        try {
            movieDelete ?
                res.status(200).json({
                    delete: 'pelicula! borrado',
                    status: 200,
                }) :
                res.status(400).json({
                    msg: "no se encuentra en pelicula!",
                    status: 400
                })

        } catch (error) {
            console.log(error);
        }
    },
    edit: async (req, res) => {

        const movieToEdit = await db.Movies.findByPk(req.params.id, {
            include: [
                {association: 'characters'},{association:'genres'}    
            ]
        })

        try {
            if (movieToEdit) {
                movieToEdit.update({

                        title: req.body.title != undefined ? req.body.title : movieToEdit.title,
                        image: req.file != undefined ? req.file.filename : movieToEdit.file,
                        date: req.body.date != undefined ? req.body.date : movieToEdit.date,
                        rating: req.body.rating != undefined ? req.body.rating : movieToEdit.rating,
                        id_genre: req.body.id_genre != undefined ? req.body.id_genre : movieToEdit.id_genre,

                    })
                    .then(movie => {
                        return res.status(200).json({
                            data: movie,
                            status: 200,
                            msg: 'pelicula editada'
                        })
                    }).catch(error =>
                        res.status(400).json({
                            status: 400,
                            msg: `no se logro editar ${error}`
                        }))
            } else {
                res.status(400).json({
                    status: 400,
                    msg: `no se encontro la pelicula`
                })
            }

        } catch (error) {
            console.log(error);
        }

    },
    detail: async (req, res) => {
        const movie = await db.Movies.findByPk(req.params.id, {
            include: [
                {association: 'characters'} ,{ association:'genres'}  
            ]
            
        })
        try {
            
            
            if(movie){
            const characterArr = movie.characters.map(x => x.name)
                        
                        const oneMovie={
                            id:movie.dataValues.id,
                            title:movie.dataValues.title,
                            rating:movie.dataValues.rating,
                            image:movie.dataValues.image,
                            date:movie.dataValues.date,
                            id_genre:movie.dataValues.genres.name,
                            characters:characterArr
                        }
                res.status(200).json({
                    data: oneMovie,
                    status: 200
                }) 
            }else{     res.status(400).json({
                    msg: "no se encuentra la pelicula",
                    status: 400
                })
            }

        } catch (error) {
            console.log(error);
        }
    },



}

module.exports = movieController