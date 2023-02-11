const boom = require('@hapi/boom');

function boomHandle(err, req, res, next){
    if(err.isBoom){
        const {output} = err;
        let error = output.payload;
        res.status(error.statusCode).json(error);
    }

    next(err);
}

module.exports={boomHandle};