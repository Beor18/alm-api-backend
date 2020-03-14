const { io } = require('../app');
const Coronavirus = require('../models/Coronavirus');
const axios = require("axios");

let exec = require('child_process').exec, child;
let connectCounter = 0;

io.on('connection', (socket) => {

    console.log("Cliente Conectado"), setInterval(
        () => getCountHotels(socket),
        2000
    );

    console.log("Nueva conexión desde " +  socket.handshake.address);
    connectCounter++; 
    console.log("Numero de conexiones actuales: " + connectCounter);

    // setInterval(
    //     () => getUsoMemo(socket),
    //     4000
    // );

    // setInterval(
    //     () => getCountHotels(socket), 
    //     3000
    // );

    socket.on('disconnect', () => {
        console.log("Cliente Desconectado");
        connectCounter--;
        console.log("Numeros de Conexiones: " + connectCounter);
    });

});

// async function getApiAndEmit(socket) {
//     try {
//         const res = await Coronavirus.find({}).sort({ _id: 1 }).countDocuments();
//         const p = await Coronavirus.find({}).sort({_id: -1}).limit(5);
//         socket.emit("FromAPI", res);
//         socket.emit("FromHotel", p);
//     } catch (error) {
//         console.error(`Error: ${error.code}`);
//     }
// };

async function getCountHotels(socket) {
    try {
        const respuesta = await axios.get("http://localhost:5000/api/v1/coronavirus");
        socket.emit("FromTemperatura", respuesta.data.data[0]);
        // socket.emit("FromRecuperados", respuesta.data.data[0].recuperados);
        // socket.emit("FromFallecidos", respuesta.data.data[0].fallecidos);
        // socket.emit("FromTotalMundo", respuesta.data.data[0].total_mundo);
        // socket.emit("FromTitulo", respuesta.data.data[0].titulo);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

// async function getUsoMemo(socket) {
//     try {
//         let memTotal, memUsed = 0, memFree = 0, memBuffered = 0, percentBuffered, percentUsed, percentFree;
//         child = await exec("egrep --color 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o", (error, stdout) => {
//             if (error !== null) {
//               console.log('exec error: ' + error);
//             } else {
//               memFree = stdout;
//               memUsed = parseInt(memTotal)-parseInt(memFree);
//               percentUsed = Math.round(parseInt(memUsed)*100/parseInt(memTotal));
//               percentFree = 100 - percentUsed;
//               socket.emit('memDisponible', stdout); 
//             }
//         });

//         child = await exec("egrep --color 'Buffers' /proc/meminfo | egrep '[0-9.]{4,}' -o", (error, stdout) => {
//             if (error !== null) {
//               console.log('exec error: ' + error);
//             } else {
//               memBuffered = stdout;
//               percentBuffered = Math.round(parseInt(memBuffered)*100/parseInt(memTotal));
//               socket.emit('memBuffered', stdout);
//             }
//         });
        
//     } catch (error) {
//         console.error(`Error: ${error.code}`);
//     }
// };
