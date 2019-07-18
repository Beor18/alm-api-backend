let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

// Testeando api rest: registrar usuario
describe('/ POST /api/hoteles', () => {
    it('Se ha registrado un hotel', (done) => {
        chai.request(url)
            .post('/api/hoteles')
            .send({ 
                id: 0, 
                name: 'Hotel Testing Prueba 001',
                latitude: '',
                longitude: '',
                stars: 3, 
                image: '6623490_6_b.jpg', 
                price: 234.56, 
                amenities: ['business-center', 'nightclub']
            })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(201);
                done();
            });
    });
});