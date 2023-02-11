const express = require('express');
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
preguntas.post('/', async(req, res,next)=>{
    const cuerpo = req.body;
    try {
        const mandar = await servicios.agregar(cuerpo);
        res.status(201).json(mandar);
    } catch (error) {
        next(error);
    }
});
preguntas.post('/:id',async(req, res,next)=>{
    const {id}=req.params;
    const {body}=req;
    try {
        const mandar = await servicios.agregarRespuesta(id,body );
        res.status(201).json(mandar);
    } catch (error) {
        next(error);
    }
});
module.exports={preguntas}