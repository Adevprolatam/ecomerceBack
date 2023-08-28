require('dotenv').config();
const cors = require('cors');
const express = require("express");
const {connectDB} = require("./config/config");
const path = require('path');


const http = require('http');
const socketIO = require('socket.io');


const app =  express();
const PORT =  process.env.PORT;
const server = http.createServer(app);
const io = socketIO(server);


app.use(cors());
app.use(express.json());
app.use("/api", require('./routes/index'));


// Escuchar la conexión de socket.io
const { setSocketIO } = require('./controllers/item');
io.on('connect', (socket) => {
    console.log("Cliente conectado", socket.id)  ;

    socket.on('disconnect', ()=>{
        console.log("Cliente desconectado")  ;
    })
    setSocketIO(io);
});




server.listen(PORT, ()=>{
    connectDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});

