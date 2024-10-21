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

const userButUserName = {
  age: 30,
  hobbies: ['music', 'experiments'],
};

const newUserButHobbies = {
  username: 'John Test',
  age: 30,
  hobbies: ['music', 'experiments', 5],
};

const newUserWithUpdate = { ...newUser, age: 80 };

let newUserId: string;
let endpointWithNewUser: string;

const testServer = startServer().listen(SERVER_PORT);

describe('Server Test. Scenario III: user updates', () => {
  test('1. Should not create a new user without username', async () => {
    const response = await supertest(testServer)
      .post(ENDPOINT)
      .set('Accept', 'application/json')
      .send(userButUserName);

    expect(response.status).toEqual(Code.BadRequest_400);
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

  test('3. Should update created user data', async () => {
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
  test('4. Should not update user data without username', async () => {
    const response = await supertest(testServer)
      .put(endpointWithNewUser)
      .set('Accept', 'application/json')
      .send(userButUserName);

    expect(response.status).toEqual(Code.BadRequest_400);
  });
  test('5. Should not update user data with invalid body', async () => {
    const response = await supertest(testServer)
      .put(endpointWithNewUser)
      .set('Accept', 'application/json')
      .send({});

    expect(response.status).toEqual(Code.BadRequest_400);
  });
  test('6. Should not update user data with invalid hobbies', async () => {
    const response = await supertest(testServer)
      .put(endpointWithNewUser)
      .set('Accept', 'application/json')
      .send(newUserButHobbies);

    expect(response.status).toEqual(Code.BadRequest_400);
  });
});

testServer.close();
