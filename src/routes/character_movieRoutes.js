const  express = require('express')

const router = express.Router()

const {create, del}= require('../controller/CharacterMovieController')


router.post('/',create)

router.delete('/:id',del)


module.exports=router


