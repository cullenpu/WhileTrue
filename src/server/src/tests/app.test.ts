import request from 'supertest';
import app from '../app';

describe('Check status endpoint', () => {
  test('Status 200', async () => {
    const res = await request(app).get('/api/status');
    expect(res.statusCode).toBe(200);
  });
});
