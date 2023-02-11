const express = require('express');
const { preguntas } = require('./preguntasRouter.js');
const direc=express.Router();

function crearApi(main){
    main.use("/api/v1",direc);
    direc.use('/preguntas', preguntas);
} 

module.exports={crearApi}