import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { endpoints } from "../routes/supplier.route";
import Supplier from "../models/supplier.model";

@Injectable({
  providedIn: "root",
})
export class SupplierService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  async getAll(): Promise<Supplier[]> {
    const url: string = endpoints.getAll;

    return await this.http
      .get<Supplier[]>(url)
      .toPromise()
      .then((response: Supplier[]) => response);
  }

  async create(supplier: Supplier): Promise<Supplier> {
    const url: string = endpoints.add;
    const data: any = JSON.stringify(supplier);

    return await this.http
      .post<Supplier>(url, supplier, super.httpOptions)
      .toPromise()
      .then((response: Supplier) => response);
  }

  async update(supplier: Supplier): Promise<Supplier> {
    const url: string = endpoints.update.replace(
      "{id}",
      supplier.id.toString()
    );
    const data: any = JSON.stringify(supplier);

    return await this.http
      .put<Supplier>(url, supplier, super.httpOptions)
      .toPromise()
      .then((response: Supplier) => response);
  }

  async delete(id: number): Promise<number> {
    const url: string = endpoints.delete.replace("{id}", id.toString());

    return await this.http
      .delete<number>(url, super.httpOptions)
      .toPromise()
      .then((response: number) => response);
  }
}
