import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";
import { endpoints } from '../routes/product.route';
import Product from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService extends ApiService<Product> {
  constructor(protected http: HttpClient) {
    super(http, endpoints.baseUrl);
  }
}
