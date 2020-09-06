import { baseUrl } from './base.route.js';

export const endpoints = {
  getAllProducts: `${baseUrl}/produto`,
  getProductById: `${baseUrl}/produto/{id}`,
  addProduct: `${baseUrl}/produto`,
  deleteProduct: `${baseUrl}/produto/{id}`,
  updateProduct: `${baseUrl}/produto/{id}`
}