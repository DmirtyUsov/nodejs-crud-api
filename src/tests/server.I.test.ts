import supertest from 'supertest';
import { Server } from 'node:http';
import { startServer } from '../server.js';
import { ENDPOINT } from '../config.js';
import { UserDTO } from '../models/user-dto.model.js';
import { StatusCode } from '../models/status-code.model.js';

const SERVER_PORT = 4000;

const newUserBody: UserDTO = {
  username: 'John Test',
  age: 30,
  hobbies: ['music', 'experiments'],
};

const updatedUserBody = { ...newUserBody, age: 80 };

let newUserId: string;
let endpointWithNewUser: string;

let testServer: Server;
beforeAll((done) => {
  testServer = startServer().listen(SERVER_PORT, () => done());
});

afterAll((done) => {
  testServer.close(() => done());
});

describe('Server Test. Scenario I: basic operations', () => {
  test('1.The first API call should return an empty array of users', async () => {
    const response = await supertest(testServer)
      .get(ENDPOINT)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(StatusCode.OK_200);
    expect(response.body).toHaveLength(0);
  });

  test('2. Should create a new user', async () => {
    const response = await supertest(testServer)
      .post(ENDPOINT)
      .set('Accept', 'application/json')
      .send(newUserBody);

    expect(response.status).toEqual(StatusCode.Created_201);
    expect(response.body.id).toBeDefined();
    newUserId = response.body.id;
    expect(response.body).toStrictEqual({ id: newUserId, ...newUserBody });
    endpointWithNewUser = `${ENDPOINT}/${newUserId}`;
  });

  test('3. Should get the newly created user', async () => {
    const response = await supertest(testServer)
      .get(endpointWithNewUser)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(StatusCode.OK_200);
    expect(response.body).toStrictEqual({ id: newUserId, ...newUserBody });
  });

  test('4. Should update created user data', async () => {
    const response = await supertest(testServer)
      .put(endpointWithNewUser)
      .set('Accept', 'application/json')
      .send(updatedUserBody);

    expect(response.status).toEqual(StatusCode.OK_200);
    expect(response.body).toStrictEqual({
      id: newUserId,
      ...updatedUserBody,
    });
  });

  test('5. Should delete created user', async () => {
    const response = await supertest(testServer)
      .delete(endpointWithNewUser)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(StatusCode.NoContent_204);
  });

  test('6. Should not get created user', async () => {
    const response = await supertest(testServer)
      .get(endpointWithNewUser)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(StatusCode.NotFound_404);
  });
});
