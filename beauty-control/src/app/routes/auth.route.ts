import { baseUrl } from './base.route.js';

export const endpoints = {
  login: `${baseUrl}/login`,
  getUser: `${baseUrl}/usuario?email={email}`,
}