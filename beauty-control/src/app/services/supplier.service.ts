import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { endpoints } from "../routes/supplier.route";
import Supplier from "../models/supplier.model";

@Injectable({
  providedIn: "root",
})
export class SupplierService extends BaseService<Supplier> {
  constructor(protected http: HttpClient) {
    super(http, endpoints.baseUrl);
  }
}
