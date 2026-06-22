const request = require('supertest');
const app = require('../index');

test('GET /health returns 200', async () => {
  const res = await request(app).get('/health');
  expect(res.statusCode).toBe(200);
});

test('Unknown route returns 404', async () => {
  const res = await request(app).get('/nonexistent-route-xyz');
  expect(res.statusCode).toBe(404);
});