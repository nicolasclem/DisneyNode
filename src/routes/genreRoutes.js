const  express = require('express')
const router = express.Router()
const upload = require('../middleware/genreMulter')
const {show,create}=require('../controller/GenreController')


router.get('/',show)


router.post('/', upload.single('image'), create)






module.exports= router