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
    it('responds with HTML containing system title, sensor-related content, and script file inclusion', async () => {
        const response = await request(app)
            .get('/');

        expect(response.status).toBe(200);
        expect(response.type).toBe('text/html');
        expect(response.text).toContain('Industrial Equipment Monitoring System');
        expect(response.text).toContain('<div id="sensors"></div>'); // Check for the presence of the sensors container
        expect(response.text).toContain('sensor'); // Check for the presence of sensor-related content
    });
});
