const mongoose = require('mongoose');

function validateMongoId(req, res, next){
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: 400,
            ok: false,
            msg:`El id igresado no es valido`
        })
    }
    next();
}
module.exports ={
    
    validateMongoId
}