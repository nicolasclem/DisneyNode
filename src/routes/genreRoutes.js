const  express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send("estoy en genres")
})




module.exports= router