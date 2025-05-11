import { User } from './user.model.js';

export type UserDTO = Omit<User, 'id'>;
