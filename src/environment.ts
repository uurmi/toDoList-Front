export const environmentProd = {
  production: true,
  baseUrl: 'https://to-do-list-eosin-nine.vercel.app',
};

export const environmentDev = {
  production: false,
  baseUrl: 'http://127.0.0.1:3000',
};

export const environment = environmentProd

export const GLOBALS = {
  TICKET_URL: '/tickets',
  CATEGORY_URL: '/categories',
  USER_URL: '/user',
  CATEGORY: '/byCategory',
  DONE: '/done',
  UPDATE_POSITION: '/updatePosition',
  LOGIN: '/login',
  SIGNUP: '/signup'
};
