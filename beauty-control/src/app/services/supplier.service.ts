import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { endpoints } from "../routes/supplier.route";
import Supplier from "../models/supplier.model";

@Injectable({
  providedIn: "root",
})
export class SupplierService extends ApiService<Supplier> {
  constructor(protected http: HttpClient) {
    super(http, endpoints.baseUrl);
  }
}
