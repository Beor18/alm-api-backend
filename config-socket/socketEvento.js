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
      const p = await Hotel.find({}).sort({_id: -1}).limit(4);
      socket.emit("FromAPI", res);
      socket.emit("FromHotel", p);
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
};
