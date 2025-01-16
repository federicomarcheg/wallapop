const request = require('supertest');
const app = require('../app');

describe('Rutas de Usuario', () => {
    it('Debe registrar un usuario con datos validos', async () => {
        const res = await request(app)
        .post('/user/register')
        .send({
            name: 'Juan Perez',
            email: 'juanmanuel@gmail.com',
            password: '123456',
            confirmPassword: '123456',
        });



        expect(res.statusCode).toBe('201');
        expect(res.body).toHaveProperty('id');
    });



    it('Debe rechazar datos invalidos', async () => {
        const res = await request(app)
        .post('/user/register')
        .send({
            name: 'jp',
            email: 'correo_invalido',
            password: '123',
        });

        expect(res.statusCode).toBe('400');
    });
});