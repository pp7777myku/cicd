const request = require('supertest');
const app = require('../app'); 

describe('GET /', () => {
  it('should return Welcome to CI/CD with GitHub Actions!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to CI/CD with GitHub Actions!');
  });
});
