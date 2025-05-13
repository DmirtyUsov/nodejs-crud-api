import { randomUUID } from 'node:crypto';
import { User } from './models/user.model.js';
import { UserDTO } from './models/user-dto.model.js';

class UsersDB {
  private users = new Map<string, User>();

  constructor(initUsers: UserDTO[] = []) {
    initUsers.forEach((user) => this.add(user));
  }

  list(): User[] {
    return Array.from(this.users.values());
  }

  add(user: UserDTO): User {
    const id = randomUUID();
    return this.update(id, user);
  }

  get(userId: string): User | null {
    return this.users.get(userId);
  }

  delete(userId: string): User | null {
    const deletedUser = this.users.get(userId);

    if (deletedUser) {
      this.users.delete(userId);
    }

    return deletedUser;
  }

  update(id: string, userDTO: UserDTO): User {
    const newUser: User = { id, ...userDTO };

    this.users.set(id, newUser);

    return { ...newUser };
  }
}
export const initUsers: UserDTO[] = [
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
export const usersDB = new UsersDB(initUsers);
