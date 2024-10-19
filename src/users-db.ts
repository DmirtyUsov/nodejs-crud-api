import { randomUUID } from 'node:crypto';
import { User } from './Models/user.model.js';

export type UsersDBAnswer = User | null | User[];

type Users = { [id: string]: User };

const initUsers: User[] = [
  {
    username: 'John Dow',
    age: 30,
    hobbies: ['music', 'experiments'],
  },
  {
    username: 'Jane Dow',
    age: 50,
    hobbies: ['movies', 'hiking'],
  },
];

class UsersDB {
  private users: Users = {};

  constructor(initUsers: User[]) {
    initUsers.forEach((newUser) => this.add(newUser));
  }

  list(): UsersDBAnswer[] {
    return Object.values(this.users);
  }

  add(newUser: User): UsersDBAnswer {
    newUser.id = randomUUID();
    this.users[newUser.id] = { ...newUser };

    return { ...newUser };
  }

  delete(id: string): UsersDBAnswer {
    let deletedUser: UsersDBAnswer = null;

    if (this.users[id]) {
      deletedUser = { ...this.users[id] };
      delete this.users[id];
    }

    return deletedUser;
  }

  update(data: User): UsersDBAnswer {
    let updateUser: UsersDBAnswer = null;

    if (data.id && this.delete(data.id)) {
      this.users[data.id] = { ...data };
      updateUser = { ...data };
    }

    return updateUser;
  }

  get(id: string): UsersDBAnswer {
    let user: UsersDBAnswer = null;

    if (this.users[id]) {
      user = { ...this.users[id] };
    }

    return user;
  }

  getFirst(): UsersDBAnswer {
    const id: string = Object.keys(this.users)[0];

    return this.get(id);
  }
}

export const usersDB = new UsersDB(initUsers);
