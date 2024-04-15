const request = require('supertest');
const app = require('../src/app'); // 假设你的主应用文件名为 app.js 并且位于 src 文件夹

describe('GET /', () => {
  it('should return Welcome to CI/CD with GitHub Actions!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to CI/CD with GitHub Actions!');
  });
});
