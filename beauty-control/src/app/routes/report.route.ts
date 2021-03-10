import { baseUrl } from './base.route.js';

export const endpoints = {
  productWorkflow: `${baseUrl}/report/product-workflow`,
  supplierRating: `${baseUrl}/report/supplier-rating`,
  productPurchasedBySupplier: `${baseUrl}/report/product-purchased-by-supplier`, 
  userRoles: `${baseUrl}/report/users-role` 
}