const db = require('../database/models');



const characterController ={


    show: async (req, res) => {
            const characters = await db.Characters.findAll({
                include: [{
                    association: 'movies'
                }]
            })
            if (characters.length > 0) {
                try {

                    const allCharacter = characters.map(character => {
                        character = {
                            name: character.dataValues.name,
                            image: character.dataValues.image
                        }
                        return character;
                    })
                    res.status(200).json({
                        data: allCharacter,
                        msg: "personaje encontrado!!"
                    })

                } catch (error) {
                    console.log(error)
                }
            } else {
                res.status(400).json({

                    msg: "Base de Datos sin Personajes!!"
                })
            }

        },

        create: (req, res) => {
            try {
                db.Characters.findOne({
                        where: {
                            name: req.body.name,
                        }
                    })
                    .then(character => {
                        if (character) {
                            return res.status(400).json({
                                character: 'el personaje ya existe',
                                error: 400,
                            })
                        } else {
                            db.Characters.create({
                                    include: [{
                                        association: 'movies'
                                    }],
                                    ...req.body,
                                    image: req.file.filename,
                                })
                                .then(character => {
                                    return res.status(200).json({
                                        data: character,
                                        status: 200,
                                        msg: 'personaje creado'
                                    })
                                }).catch(error => console.log(error))
                        }
                    }).catch(() =>  res.status(400).json({
                        msg: 'no se pudo crear el personaje!',
                        status:400
                    })
                )
            } catch (err) {
                console.log(err)
            }
        },
        edit: async (req, res) => {

                const characterToEdit = await db.Characters.findByPk(req.params.id, {
                    include: [{
                        association: 'movies'
                    }]
                })

                try {
                    if (characterToEdit) {
                        characterToEdit.update({

                                name: req.body.name != undefined ? req.body.name : characterToEdit.name,
                                image: req.file != undefined ? req.file.filename : characterToEdit.file,
                                age: req.body.age != undefined ? req.body.age : characterToEdit.age,
                                history: req.body.history != undefined ? req.body.history : characterToEdit.history,
                                weight: req.body.weight != undefined ? req.body.weight : characterToEdit.weight,

                            })
                            .then(character => {
                                return res.status(200).json({
                                    data: character,
                                    status: 200,
                                    msg: 'personaje editado'
                                })
                            }).catch(error =>
                                res.status(400).json({
                                    status: 400,
                                    msg: `no se logro editar ${error}`
                                }))
                    } else {
                        res.status(400).json({
                            status: 400,
                            msg: `no se encontro el personaje`
                        })
                    }

                } catch (error) {
                    console.log(error);
                }

            },
            detail: async (req, res) => {
                    const character = await db.Characters.findByPk(req.params.id, {
                        include: [{
                            association: 'movies'
                        }]
                        // pendiente traer todas las movies del personaje!!!!
                    })
                    try {
                        character ?
                            res.status(200).json({
                                data: character,
                                status: 200
                            }) :
                            res.status(400).json({
                                msg: "no se encuentra en personaje",
                                status: 400
                            })

                    } catch (error) {
                        console.log(error);
                    }
                },

                del: async (req, res) => {
                    const characterDelete = await db.Characters.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    try {
                        characterDelete ?
                            res.status(200).json({
                                delete: 'personaje borrado',
                                status: 200,
                            }) :
                            res.status(400).json({
                                msg: "no se encuentra en personaje",
                                status: 400
                            })

                    } catch (error) {
                        console.log(error);
                    }
                }



    }

    module.exports = characterController