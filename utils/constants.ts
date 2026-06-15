import 'dotenv/config';

export const CONSTANTS = {
  BASE_URL: process.env.BASE_URL || 'https://mystlc.ai/login',
  USER_NAME: process.env.USER_NAME || 'avinash.peesapati@ascendqe.com',
  USER_PASSWORD: process.env.USER_PASSWORD || '1234#',
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
  },
  STORAGE_STATE_PATH: 'playwright/.auth/user.json'
};
