const shortUnique = require('short-unique-id');
const reserva = new shortUnique();

const  arreglo = []; 

for (let i = 0; i < 9; i++) { 
    arreglo.push({
        _id: reserva.randomUUID(6).toUpperCase(),
        date: new Date(),
        available: true,
    }); 
}

console.log('se ha generado el siguiente código:');
console.log('');
console.log(arreglo);
console.log('');