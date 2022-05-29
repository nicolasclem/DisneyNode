const express = require('express')
const router = express.Router()
const upload = require('../middleware/characterMulter')
const {validateCharacter}=require('../middleware/validators/character')
const {
    show,
    create,
    detail,
    del,
    edit
} = require('../controller/CharacterController')


router.get('/', show)
router.get('/:id', detail)

router.post('/', upload.single('image'), validateCharacter, create)

router.put('/:id', upload.single('image'), validateCharacter, edit)

router.delete('/:id', del)




module.exports = router