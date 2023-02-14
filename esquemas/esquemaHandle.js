const boom = require('@hapi/boom');
const Joi = require("joi");

const pregunta = Joi.string().min(1);
const respuesta = Joi.string().min(1);
const estado = Joi.bool();

const verificarPregunta=Joi.object(
    {
        pregunta:pregunta.required()
    }
);
const verificarRespuesta = Joi.object(
    {
        respuesta:respuesta.required(),
    }
);
const editarRespuesta = Joi.object(
    {
        estado:estado,
        respuesta:respuesta
    }
);
function validatorHandler(schema, property) {
    return (req, res, next) => {
      const data = req[property];
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        next(boom.badRequest(error));
      }
      next();
    }
  }
  module.exports={
    validatorHandler,
    editarRespuesta,
    verificarPregunta,
    verificarRespuesta
  }