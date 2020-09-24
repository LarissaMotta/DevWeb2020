import { baseUrl } from "./base.route.js";

export const endpoints = {
  baseUrl:`${baseUrl}/users`, 
  getAll: `${baseUrl}/users`,
  getUserByEmail: `${baseUrl}/users?email={email}`,
  getUserById: `${baseUrl}/users?id={id}`,
  getCurrentUser: `${baseUrl}/auth`
};
