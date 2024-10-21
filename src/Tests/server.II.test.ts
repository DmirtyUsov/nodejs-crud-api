import supertest from 'supertest';
import { startServer } from '../server.js';
import { ENDPOINT } from '../config.js';
import { Code } from '../Models/crud-response.model.js';

const SERVER_PORT = 4000;

const validUserId = '2a17c1f3-a6f7-4f38-87d7-d3ef0f9af1dc';
const invalidUserId = 'i-am-definitely-a-valid-uuid';

const testServer = startServer().listen(SERVER_PORT);

describe('Server Test. Scenario II: invalid operations', () => {
  test('1. Should return 404 for unsupported PATCH method', async () => {
    const response = await supertest(testServer)
      .patch(ENDPOINT)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(Code.NotFound_404);
  });

  test('2. Should respond with 404 code for non-existent endpoint', async () => {
    const response = await supertest(testServer)
      .patch('/test')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(Code.NotFound_404);
  });

  describe('3. Should respond with 404 code for non-existent user', () => {
    const endpoint = `${ENDPOINT}/${validUserId}`;
    test('GET', async () => {
      const response = await supertest(testServer)
        .get(endpoint)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(Code.NotFound_404);
    });
    test('DELETE', async () => {
      const response = await supertest(testServer)
        .delete(endpoint)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(Code.NotFound_404);
    });
    test('PUT', async () => {
      const response = await supertest(testServer)
        .post(endpoint)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(Code.NotFound_404);
    });
  });

  describe('4. Should respond with 400 code for invalid uuid', () => {
    const endpoint = `${ENDPOINT}/${invalidUserId}`;
    test('GET', async () => {
      const response = await supertest(testServer)
        .get(endpoint)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(Code.BadRequest_400);
    });
    test('DELETE', async () => {
      const response = await supertest(testServer)
        .delete(endpoint)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(Code.BadRequest_400);
    });
    test('PUT', async () => {
      const response = await supertest(testServer)
        .put(endpoint)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(Code.BadRequest_400);
    });
  });
});

testServer.close();
