import { UserDTO } from '../models/user-dto.model.js';

export const checkIsValidBody = (body: UserDTO): boolean => {
  const { username, age, hobbies } = body;

  if (!username || !age || !hobbies) {
    return false;
  }
  if (typeof username !== 'string' || typeof age !== 'number') {
    return false;
  }

  if (!Array.isArray(hobbies)) {
    return false;
  }

  if (hobbies.some((hobby: unknown) => typeof hobby !== 'string')) {
    return false;
  }
  return true;
};
