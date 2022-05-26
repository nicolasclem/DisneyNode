const  express = require('express')
const router = express.Router()
const upload = require('../middleware/characterMulter')
const {show,create,detail,del} =require('../controller/CharacterControlle')


router.get('/',show)
router.get('/:id', detail)

router.post('/',upload.single('image'),create)

router.delete('/:id',del)




module.exports= router