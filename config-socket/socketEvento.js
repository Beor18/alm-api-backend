const { io } = require('../app');
const Hotel = require('../models/Hotel');
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

    socket.on('disconnect', () => {
        console.log("Cliente Desconectado");
    });

});

const getApiAndEmit = async socket => {
    try {
        const res = await Hotel.find({}).sort({ _id: 1 }).countDocuments();
        const p = await Hotel.find({}).sort({_id: -1}).limit(5);
        socket.emit("FromAPI", res);
        socket.emit("FromHotel", p);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

const getUsoMemo = async socket => {
    try {
        let memTotal, memUsed = 0, memFree = 0, percentUsed, percentFree;
        child = exec("egrep --color 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o", (error, stdout) => {
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
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
