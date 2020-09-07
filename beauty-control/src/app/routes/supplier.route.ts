import { baseUrl } from './base.route.js';

export const endpoints = {
  getAll: `${baseUrl}/supplier`,
  getById: `${baseUrl}/supplier/{id}`,
  add: `${baseUrl}/supplier`,
  delete: `${baseUrl}/supplier/{id}`,
  update: `${baseUrl}/supplier/{id}`
}