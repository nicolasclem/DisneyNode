const  express = require('express')
const router = express.Router()
const upload = require('../middleware/moviesMulter')
const {show,create,del,edit,detail}=require('../controller/MovieController')


router.get('/',show)
router.get('/:id',detail)



router.put('/:id',upload.single('image'), edit)

router.post('/', upload.single('image'), create)



router.delete('/:id', del)

module.exports= router