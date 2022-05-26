const  express = require('express')
const router = express.Router()
const userController = require('../controller/usersController')


router.get('/login',(req,res)=>{
    res.send("estoy en login")
})

router.post('/register',userController.register)





module.exports= router