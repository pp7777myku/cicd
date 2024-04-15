const request = require('supertest');
const app = require('../app');

describe('GET static JavaScript file', () => {
    it('responds with JavaScript file', async () => {
        const response = await request(app)
            .get('/script.js');

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/javascript');
        expect(response.text).toContain('generateSensorData');
    });
});

describe('GET /', () => {
    it('responds with HTML containing sensors', async () => {
        const response = await request(app)
            .get('/');

        expect(response.status).toBe(200);
        expect(response.type).toBe('text/html');
        expect(response.text).toContain('Device 1 -');
        expect(response.text).toContain('Device 10 -');
        expect(response.text).toContain('generateSensorData');
    });
});
