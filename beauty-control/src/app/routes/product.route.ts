import { baseUrl } from './base.route.js';

export const endpoints = {
  baseUrl: `${baseUrl}/products/`,
  getProductImage: `${baseUrl}/products/{id}/img`,
  productSupplier: `${baseUrl}/product-suppliers`,
  productStockLog: `${baseUrl}/product-stock-logs`
}