
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
            throw boom.notFound('No se encontró respuesta');
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
        actualizar(this.datos);
        return{message};
    }
    async editarPregunta(num, body){
        let indice = this.datos.preguntas.findIndex(elemento=>elemento.id==num);
        if(this.datos.preguntas.length===0 || indice===-1){
            throw boom.notFound('No se encontró pregunta');
        }
        let elemento = this.datos.preguntas[indice];
        this.datos.preguntas[indice]={
            ...elemento,
            ...body
        }
        actualizar(this.datos);
        return{message:`Se modificó pregunta ${num} con exito`}
    }
    async editarRespuesta(num,num2, body){
        let indice = this.datos.preguntas.findIndex(elemento=>elemento.id==num);
        if(this.datos.preguntas.length===0 || indice===-1){
            throw boom.notFound('No se encontró respuesta');
        }
        let resp = this.datos.preguntas[indice].respuestas;
        let indice2=resp.findIndex(ele=>ele.id==num2);
        if(indice2===-1){
            throw boom.notFound('No se encontró respuesta');
        }
        let cuador = resp[indice2];
        this.datos.preguntas[indice].respuestas[indice2]={
            ...cuador,
            ...body
        }
        actualizar(this.datos);
        return {message:"Se cambio respuesta o estado con exito"};
    }
    async borrarTodo(){
        this.datos.preguntas=[];
        actualizar(this.datos);
        return {message: "Se han borrado todos los elementos"};
    }
    async borrarPregunta(num){
        let indice = this.datos.preguntas.findIndex(elemento=>elemento.id==num);
        if(this.datos.preguntas.length===0 || indice===-1){
            throw boom.notFound('No se encontró pregunta');
        }
        this.datos.preguntas.splice(indice, 1);
        actualizar(this.datos);
        return{message:`Se borró elemento ${num}`}
    }
    async borrarRespuesta(num, num2){
        let indice = this.datos.preguntas.findIndex(elemento=>elemento.id==num);
        if(this.datos.preguntas.length===0 || indice===-1){
            throw boom.notFound('No se encontró respuesta');
        }
        let indice2 = this.datos.preguntas[indice].respuestas.findIndex(elemento=>elemento.id==num2);
        if(indice2===-1){
            throw boom.notFound('No se encontró respuesta');
        }
        this.datos.preguntas[indice].respuestas.splice(indice2,1);
        actualizar(this.datos);
        return{message:`Se borró la respuesta ${num2} de la pregunta ${num}`};
    }
}

module.exports={ServicioPreguntas}