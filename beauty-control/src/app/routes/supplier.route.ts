import { baseUrl } from './base.route.js';

export const endpoints = {
  baseUrl: `${baseUrl}/suppliers`,
  urlRateSupplier: `${baseUrl}/user-supplier-ratings`,
  urlGetRateSupplier: `${baseUrl}/user-supplier-ratings?userId={userId}&supplierId={supplierId}`
}