const { io } = require('../app');
const Hotel = require('../models/Hotel');


io.on('connection', (socket) => {

    console.log("Cliente Conectado"), setInterval(
        () => getApiAndEmit(socket),
        2000
    );

    socket.on('disconnect', () => {
        console.log("Cliente Desconectado");
    });

});

const getApiAndEmit = async socket => {
    try {
      const res = await Hotel.find({}).sort({ _id: 1 }).countDocuments();
      socket.emit("FromAPI", res);
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
};
