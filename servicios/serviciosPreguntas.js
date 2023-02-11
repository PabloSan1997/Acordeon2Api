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
    async agregarRespuesta(num, body){
        let indice = this.datos.preguntas.findIndex(elemento=>elemento.id==num);
        if(this.datos.preguntas.length===0 || indice===-1){
            throw boom.notFound('No se encontró pregunta');
        }
        let elemento = this.datos.preguntas[indice];
        let id2 =  elemento.respuestas.length!==0?elemento.respuestas[elemento.respuestas.length-1].id+1:1;
        let objeto = {
            id:id2,
            estado:false,
            ...body
        }
        this.datos.preguntas[indice].respuestas.push(objeto);
        let message = 'Respuesta agregada con exito';
        return{message};
    }
}

module.exports={ServicioPreguntas}