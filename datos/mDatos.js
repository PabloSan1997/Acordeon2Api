const fs = require('fs');


const datos = require('./datos.json'); 

async function actualizar(info){
    let nuevos = JSON.stringify(info);
    fs.writeFile('./datos/datos.json',nuevos, (error)=>{
        if(error){
            throw new Error('Error interno');
        }
    });

}
module.exports={datos, actualizar}
