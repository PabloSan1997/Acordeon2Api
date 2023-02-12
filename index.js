
const express = require('express');
const cors = require('cors');
const { boomHandle } = require('./middleware/handle.js');
const { crearApi } = require('./Routers/index.js');
const PUERTO = process.env.PORT || 3005;
const app = express();


app.use(express.json());
app.use(cors());
crearApi(app);
app.use(boomHandle);
app.get('/', (req, res)=>{
    res.send('Bienvenidos a mi api :)');
});


app.listen(PUERTO, ()=>{
    if(!process.env.PORT){
        console.log(`Escuchando en http://localhost:${PUERTO}/`);
    }
});
