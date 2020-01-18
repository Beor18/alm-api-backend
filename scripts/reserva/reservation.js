const shortUnique = require('short-unique-id');
const reserva = new shortUnique();
const moment = require('moment');

let value = {
    interval: '00:05:00',
    startTime: moment().startOf("minute"),
    endTime: moment().endOf("minute")
};
  
const inputDataFormat = "HH:mm:ss";
const outputFormat = "HH:mm a";

const tmp = moment(value.interval, inputDataFormat);
const dif = tmp - moment().startOf("day");

const startIntervalTime = moment(value.startTime, inputDataFormat).add(+dif, "ms");
const endIntervalTime = moment(value.startTime, inputDataFormat);
  
function prepareIntervals() {
    
    const intervals = [];
    const formatStart = startIntervalTime.format(outputFormat);
    const formatEnd = endIntervalTime.format(outputFormat);

    intervals.push({
        id: reserva.randomUUID(6).toUpperCase(),
        comienza: formatEnd, 
        termina: formatStart
    });
    
    startIntervalTime.add(dif, "ms");
    endIntervalTime.add(dif, "ms");
    return intervals;
}

console.log('se ha generado el siguiente código:');

module.exports = {
    prepareIntervals
};