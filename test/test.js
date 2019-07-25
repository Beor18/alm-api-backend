const supertest = require('supertest');
const url = 'https://almundo-examen.herokuapp.com';

// Testeando api rest
describe('hoteles API', () => {
    it('Se ha registrado un hotel', async () => {
        const request = await supertest(url)
            .post('/api/hoteles')
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

    it('GET a todos los hoteles', async () => {
        const response = await supertest(url)
            .get('/api/hoteles')
            .expect(200);
        expect(response.body);
    });  
});