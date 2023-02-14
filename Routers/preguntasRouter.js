const express = require('express');
const { verificarPregunta, verificarRespuesta, editarRespuesta, validatorHandler } = require('../esquemas/esquemaHandle.js');
const { ServicioPreguntas } = require('../servicios/serviciosPreguntas.js');
const preguntas = express.Router();
const servicios = new ServicioPreguntas();

preguntas.get('/', async(req, res, next)=>{
  try{
    const leer = await servicios.leer();
    res.json(leer);
  }catch(err){
    next(err);
  }
});

// ---------POST----------------------
preguntas.post('/',validatorHandler(verificarPregunta, 'body') ,async(req, res,next)=>{
    const cuerpo = req.body;
    try {
        const mandar = await servicios.agregar(cuerpo);
        res.status(201).json(mandar);
    } catch (error) {
        next(error);
    }
});
preguntas.post('/:id',validatorHandler(verificarRespuesta, 'body'),async(req, res,next)=>{
    const {id}=req.params;
    const {body}=req;
    try {
        const mandar = await servicios.agregarRespuesta(id,body );
        res.status(201).json(mandar);
    } catch (error) {
        next(error);
    }
});
// -------------------------------------

// -------------------PATCH------------------------
preguntas.patch('/:id/pregunta',validatorHandler(verificarPregunta, 'body'),async (req, res, next)=>{
    const{id}=req.params;
    try {  
        const mensaje = await servicios.editarPregunta(id, req.body);
        res.json(mensaje)
    } catch (error) {
        next(error);
    }
});
preguntas.patch('/:id/respuesta/:id2',validatorHandler(editarRespuesta, 'body'),async (req, res, next)=>{
    const{id, id2}=req.params;
    try {
        const mandar = await servicios.editarRespuesta(id, id2,req.body);
        res.json(mandar);
    } catch (error) {
        next(error);
    }
});

//------------------------------------------

// ----------------------DELETE----------------
    preguntas.delete('/todo',async(req, res, next)=>{
        try {
            const borrar= await servicios.borrarTodo();
            res.json(borrar);
        } catch (error) {
            next(error);
        }
    });
    preguntas.delete('/:id',async(req, res, next)=>{
        const{id}=req.params;
        try {
            const borrar= await servicios.borrarPregunta(id);
            res.json(borrar);
        } catch (error) {
            next(error);
        }
    });
    preguntas.delete('/:id/borrar/:id2',async(req, res, next)=>{
        const{id, id2}=req.params;
        try {
            const borrar= await servicios.borrarRespuesta(id, id2);
            res.json(borrar);
        } catch (error) {
            next(error);
        }
    });

//---------------------------------------------
module.exports={preguntas}