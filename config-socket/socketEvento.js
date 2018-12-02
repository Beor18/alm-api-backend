const { io } = require('../app');
const Hotel = require('../models/Hotel');
const axios = require("axios");

let exec = require('child_process').exec, child;

io.on('connection', (socket) => {

    console.log("Cliente Conectado"), setInterval(
        () => getApiAndEmit(socket),
        2000
    );

    setInterval(
        () => getUsoMemo(socket),
        4000
    );

    setInterval(
        () => getTemperatura(socket), 
        3000
    );

    socket.on('disconnect', () => {
        console.log("Cliente Desconectado");
    });

});

async function getApiAndEmit(socket) {
    try {
        const res = await Hotel.find({}).sort({ _id: 1 }).countDocuments();
        const p = await Hotel.find({}).sort({_id: -1}).limit(5);
        socket.emit("FromAPI", res);
        socket.emit("FromHotel", p);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

async function getTemperatura(socket) {
    try {
        const respuesta = await axios.get("http://ingresar-url");
        socket.emit("FromTemperatura", respuesta.data.cuantos);
        console.log(respuesta.data.cuantos);
        
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

async function getUsoMemo(socket) {
    try {
        let memTotal, memUsed = 0, memFree = 0, memBuffered = 0, percentBuffered, percentUsed, percentFree;
        child = await exec("egrep --color 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o", (error, stdout) => {
            if (error !== null) {
              console.log('exec error: ' + error);
            } else {
              memFree = stdout;
              memUsed = parseInt(memTotal)-parseInt(memFree);
              percentUsed = Math.round(parseInt(memUsed)*100/parseInt(memTotal));
              percentFree = 100 - percentUsed;
              socket.emit('memDisponible', stdout); 
            }
        });

        child = await exec("egrep --color 'Buffers' /proc/meminfo | egrep '[0-9.]{4,}' -o", (error, stdout) => {
            if (error !== null) {
              console.log('exec error: ' + error);
            } else {
              memBuffered = stdout;
              percentBuffered = Math.round(parseInt(memBuffered)*100/parseInt(memTotal));
              socket.emit('memBuffered', stdout);
            }
        });
        
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
