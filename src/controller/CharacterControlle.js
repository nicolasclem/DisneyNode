const db = require('../database/models');



const characterController ={


    show:async (req,res) => {
      const characters=  await db.Characters.findAll({
        include:[{association:'movies'}]
      })

      try {
        const allCharacter = characters.map(character =>{
            character={
                name:character.dataValues.name,
                image:`http://localhost:3000/img/character/${character.dataValues.image}`
            }
            return character;
        })
        res.status(200).json({
            msg: allCharacter
        })
            
    } catch (error) {
        console.log(error)
    }

    },

    create: (req, res) =>{
        try{
            db.Characters.findOne({
                where:{
                    name: req.body.name,
                }
            })
            .then(character =>{
                if(character){
                    return res.status(400).json({
                        character: 'el personaje ya existe',
                        error: 400,
                    })
                }else {
                    db.Characters.create({
                        include:[ {association: 'movies'} ],
                        ...req.body,
                        image:req.file.filename,
                    })
                    .then(character =>{
                        return res.status(200).json({
                            data: character,
                            status:200,
                            created: 'personaje creado'
                        })
                    }).catch(error=>console.log(error))
                }
            }).catch(error=>console.log(error))
        } catch (err) {console.log(err) }
    },

    // create: async (req, res) => {
    //             try {
    //                 db.Character.findOne({
    //                         where: {
    //                             name: req.body.name
    //                         }
    //                     })
    //                         .then((character) => {
    //                             if (character) {
    //                                 return res.status(400).json({
    //                                     character: 'el personaje ya existe',
    //                                     error: 400,
    //                                 })
    //                             } else {
    //                                 db.Character.create({
    //                                         include: [{
    //                                             association: 'movies'
    //                                         }],
    //                                         ...req.body,
    //                                         image: req.file.filename
    //                                     })
    //                                     .then(character => {
    //                                         return res.status(200).json({
    //                                             data: character,
    //                                             created: 'personaje creado',
    //                                             status: 200,
    //                                         })
    //                                     }).catch(error => console.log(error))
    //                             }

    //                         }).catch(error => console.log(error))

    //                     }catch(error){
    //                         console.log(error);
    //                     }
                    
                    

    // },
    detail: async(req,res)=>{
        const character = await db.Characters.findByPk(req.params.id,{
            include: [{
                association: 'movies'
            }]
        })
        try {
            character ?
                res.status(200).json({
                data: character,
                status:200
            }):
            res.status(400).json({
                msg:"no se encuentra en personaje",
                status:400
            })

        } catch (error) {
            console.log(error);
        }
    },

    del : (req,res)=>{
        db.Characters.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(character=> {
            return res.status(200).json({
                data: character,
                delte: 'personaje borrado',
                status: 200,
            })
        }).catch(error => console.log(error))
    }



}

module.exports = characterController