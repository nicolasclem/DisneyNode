const {check}= require('express-validator');
const {validateResult}=require('../../../helpers/validateHelper')

const validateCharacter =[

    check('name')
        .exists()
        .not()
        .isEmpty(),
    check('age')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
   
    (req,res,next)=>{
        validateResult(req,res,next)
    }
        


]

module.exports={validateCharacter}