const db = require('../database/models');
const bcrypt = require('bcryptjs');


const  userController = {

    login:  (req,res)=>{

        const {email,password}= req.body;
        try {
            db.User.findOne({
                where: {
                    email
                }
            })
            .then(user =>{
                if(user){
                    const passUSer = bcrypt.compareSync(password,user.password)

                    passUSer ? res.status(200).json({
                        msg:'usuario Logeado'
                    }):res.status(400).json({
                        msg:'Contraseña incorrecta'
                    })



                }else{
                    return res.status(400).json({
                        msg: 'usuario no registrado'

                })

            }
        }).catch (error => console.log(error) )
        } catch (error) { console.log(error) }


    },
    
    register:  (req, res) => {
        const { name, email, password } = req.body;
        try {
            db.User.findOne({
                    where: {
                        email
                    }
                })
                .then((user) => {
                    if (user) {
                        return res.status(400).json({
                            msg: 'el mail esta en uso',
                            error: 400,
                        })
                    } else {
                        db.User.create({
                                name,
                                email,
                                password: bcrypt.hashSync(password, 8),
                            })
                            .then(user => {
                                return res.status(200).json({
                                    data: user,
                                    created: 'usuario creado',
                                    status: 200,
                                })
                            }).catch(error => console.log(error))
                    }
                }).catch(error => console.log(error))
        } catch (error) { console.log(error) }
    }

}

module.exports = userController;