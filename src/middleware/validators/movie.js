const {check}= require('express-validator');
const {validateResult}=require('../../../helpers/validateHelper')

const validateMovie =[

    check('title')
        .exists()
        .not()
        .isEmpty(),
    check('rating')
        .exists()
        .not()
        .isEmpty()
        .isInt({min:1, max:5}),
    check('id_genre')
        .exists()
        .not()
        .isEmpty(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
        


]

module.exports={validateMovie}