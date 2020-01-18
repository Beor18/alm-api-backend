const { prepareIntervals } = require('./reservation');
const prepare = prepareIntervals()

const e = {
    id: prepare.map(horaComienza => horaComienza.id).toString(),
    comienza: prepare.map(horaComienza => horaComienza.comienza).toString(),
    termina: prepare.map(horaComienza => horaComienza.termina).toString(),
    available: true,
};


console.log(e)