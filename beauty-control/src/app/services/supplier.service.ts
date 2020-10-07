import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { endpoints } from "../routes/supplier.route";
import Supplier from "../models/supplier.model";
import { UserSupplierRating } from '../models/user-supplier-rating.model';

@Injectable({
  providedIn: "root",
})
export class SupplierService extends BaseService<Supplier> {
  constructor(protected http: HttpClient) {
    super(http, endpoints.baseUrl);
  }

  rateSupplier(userSuplierRating: UserSupplierRating) {
    return this.http.post<UserSupplierRating>(endpoints.urlRateSupplier, JSON.stringify(userSuplierRating), this.httpOptions);
  }

  getRateSupplier(userId: number, supplierId: number) {
    const url = endpoints.urlGetRateSupplier
      .replace("{userId}", userId.toString())
      .replace("{supplierId}", supplierId.toString());

    return this.http.get<UserSupplierRating>(url, this.httpOptions);
  }
}
