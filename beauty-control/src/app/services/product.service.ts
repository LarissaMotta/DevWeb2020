import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { endpoints } from "../routes/product.route";
import { ApiService } from "./api.service";
import Product from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  async getAll(): Promise<Product[]> {
    const url: string = endpoints.getAllProducts;

    return await this.http
      .get<Product[]>(url)
      .toPromise()
      .then((response: Product[]) => response);
  }

  async create(product: Product): Promise<Product> {
    const url: string = endpoints.addProduct;
    const data: any = JSON.stringify(product);

    return await this.http
      .post<Product>(url, product, super.httpOptions)
      .toPromise()
      .then((response: Product) => response);
  }

  async update(product: Product): Promise<Product> {
    const url: string = endpoints.updateProduct.replace(
      "{id}",
      product.id.toString()
    );
    const data: any = JSON.stringify(product);

    return await this.http
      .put<Product>(url, product, super.httpOptions)
      .toPromise()
      .then((response: Product) => response);
  }

  async delete(id: number): Promise<number> {
    const url: string = endpoints.deleteProduct.replace("{id}", id.toString());

    return await this.http
      .delete<number>(url, super.httpOptions)
      .toPromise()
      .then((response: number) => response);
  }
}
