const request = require('supertest');
const app = require('../server/app');

describe('API Health Tests', () => {
  it('should return 200 for the home page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toEqual(404);
  });
});
