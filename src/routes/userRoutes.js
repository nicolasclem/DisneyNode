const  express = require('express')
const router = express.Router()


router.get('/login',(req,res)=>{
    res.send("estoy en login")
})

router.get('/register',(req,res)=>{
    res.send("estoy en register")
})





module.exports= router