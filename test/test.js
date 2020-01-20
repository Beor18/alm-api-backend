const supertest = require('supertest');
const url = 'https://almundo-examen.herokuapp.com';

// Testeando api rest
describe('hoteles API', () => {
    it('Se ha registrado un hotel', async () => {
        const request = await supertest(url)
            .post('/api/v1/hoteles')
            .send({ 
              id: 0, 
              name: 'Hotel Testing Prueba con JEST',
              latitude: '',
              longitude: '',
              stars: 3, 
              image: '6623490_6_b.jpg', 
              price: 234.56, 
              amenities: ['business-center', 'nightclub']
            })
            .expect(201);
        expect(request.body);
    });

    it('Se ha registrado una habitacion', async () => {
        const request = await supertest(url)
            .post('/api/v1/hoteles/5d83c75c769619001e00cd96/habitaciones')
            .send({ 
              id: 0, 
              name: 'Habitacion Testing Prueba para Los Lirios',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada vehicula lacus. Sed quis fringilla felis, eget rutrum sem. Cras porta laoreet ligula, eget fringilla nulla tempus at',
              availability: 1,
              image: '6623490_6_b.jpg', 
              price: 34.56, 
              amenities: ['business-center']
            })
            .expect(201);
        expect(request.body);
    });

    it('GET a todos los hoteles', async () => {
        const response = await supertest(url)
            .get('/api/v1/hoteles')
            .expect(200);
        expect(response.body);
    });  
});