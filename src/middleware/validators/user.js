const {check}= require('express-validator');
const {validateResult}=require('../../../helpers/validateHelper')

const validateRegister =[

    check('name')
        .exists()
        .not()
        .isEmpty(),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check('password')
        .exists()
        .not()
        .isEmpty()
        .isLength({ min: 5}),
    (req,res,next)=>{
        validateResult(req,res,next)
    }
        


]

module.exports={validateRegister}