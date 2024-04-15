describe('GET /', () => {
    it('should return the correct page title', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('Industrial Equipment Monitoring System');
    });
  });
  