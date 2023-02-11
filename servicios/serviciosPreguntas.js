const express = require('express');
const { datos, actualizar } = require('../datos/mDatos.js');
const boom = require('@hapi/boom');

class ServicioPreguntas{
    constructor(){
        this.datos=datos;
    }
    async leer(){
        if(this.datos.preguntas.length===0){
            throw boom.notFound('No se encontraron elementos');
        }
        return this.datos.preguntas;
    }
    async agregar(cuerpo){
        let num=1;
        if(this.datos.preguntas.length!==0){
            let ultimo=this.datos.preguntas[this.datos.preguntas.length-1].id;
            num+=ultimo;
        }
        let nuevo = {
            id:num,
            respuestas:[],
            ...cuerpo
        }
        this.datos.preguntas.push(nuevo);
        actualizar(this.datos);
        return {message:'Se agregó pregunta con exito'};
    }
}

module.exports={ServicioPreguntas}