const  express = require('express')
const router = express.Router()
const {register,login} = require('../controller/usersController')
const {validateRegister}=require('../middleware/validators/user')

router.post('/login',login)

router.post('/register',validateRegister,register)





module.exports= router