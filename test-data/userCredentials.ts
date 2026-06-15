import { CONSTANTS } from '../utils/constants';

export const userCredentials = {
  validUser: {
    username: CONSTANTS.USER_NAME,
    password: CONSTANTS.USER_PASSWORD,
  },
  invalidUser: {
    username: 'invalid.user@example.com',
    password: 'WrongPassword123!',
  }
};
