const  express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send("estoy en movies")
})




module.exports= router