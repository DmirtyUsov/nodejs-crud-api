import supertest from 'supertest';
import { startServer } from '../server.js';
import { User } from '../Models/user.model.js';
import { ENDPOINT } from '../config.js';
import { Code } from '../Models/crud-response.model.js';

const SERVER_PORT = 4000;

const newUser: User = {
  username: 'John Test',
  age: 30,
  hobbies: ['music', 'experiments'],
};

const newUserWithUpdate = { ...newUser, age: 80 };

let newUserId: string;
let endpointWithNewUser: string;

const testServer = startServer().listen(SERVER_PORT);

describe('Server Test. Scenario I: basic operations', () => {
  test('1.The first API call should return an empty array of (to del 2) users', async () => {
    const response = await supertest(testServer)
      .get(ENDPOINT)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(Code.OK_200);
    expect(response.body).toHaveLength(2);
  });

  test('2. Should create a new user', async () => {
    const response = await supertest(testServer)
      .post(ENDPOINT)
      .set('Accept', 'application/json')
      .send(newUser);

    expect(response.status).toEqual(Code.Created_201);
    expect(response.body.id).toBeDefined();
    newUserId = response.body.id;
    expect(response.body).toStrictEqual({ id: newUserId, ...newUser });
    endpointWithNewUser = `${ENDPOINT}/${newUserId}`;
  });

  test('3. Should get the newly created user', async () => {
    const response = await supertest(testServer)
      .get(endpointWithNewUser)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(Code.OK_200);
    expect(response.body).toStrictEqual({ id: newUserId, ...newUser });
  });

  test('4. Should update created user data', async () => {
    const response = await supertest(testServer)
      .put(endpointWithNewUser)
      .set('Accept', 'application/json')
      .send(newUserWithUpdate);

    expect(response.status).toEqual(Code.OK_200);
    expect(response.body).toStrictEqual({
      id: newUserId,
      ...newUserWithUpdate,
    });
  });

  test('5. Should delete created user', async () => {
    const response = await supertest(testServer)
      .delete(endpointWithNewUser)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(Code.NoContent_204);
  });

  test('6. Should not get created user', async () => {
    const response = await supertest(testServer)
      .get(endpointWithNewUser)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(Code.NotFound_404);
  });
});

testServer.close();
