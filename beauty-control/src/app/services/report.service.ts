import { endpoints } from './../routes/report.route';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductWorkflow } from '../models/product-workflow.model';
import { BestSupplier } from '../models/best-supplier.model';
import { ProductPurchased } from '../models/product-purchased.model';
import { UserRoleReport } from '../models/user-role-report.model';

@Injectable({
  providedIn: "root",
})
export class ReportService {

  constructor(private http: HttpClient) {}

  public getProductWorkFlow(start?: Date, end?: Date): Observable<ProductWorkflow> {
    const params = this.getRangeDateParams(start, end);

    return this.http.get<ProductWorkflow>(
      endpoints.productWorkflow, 
      { params }
    );
  }

  public getSupplierRating(rating?: number): Observable<BestSupplier[]> {
    const params = this.getRatingParam(rating);

    return this.http.get<BestSupplier[]>(
      endpoints.supplierRating,
      { params }
    );
  }

  public getProductPurchasedBySupplier(start?: Date, end?: Date): Observable<ProductPurchased[]> {
    const params = this.getRangeDateParams(start, end);

    return this.http.get<ProductPurchased[]>(
      endpoints.productPurchasedBySupplier,
      { params }
    );
  }

  public getUserRole(start?: Date, end?: Date): Observable<UserRoleReport> {
    const params = this.getRangeDateParams(start, end);

    return this.http.get<UserRoleReport>(
      endpoints.userRoles,
      { params }
    );
  }

  private getRangeDateParams(start?: Date, end?: Date): HttpParams {
    const httpParams = new HttpParams()
      .set("startDate", start?.toISOString())
      .set("endDate", end?.toISOString());

    return httpParams;
  }

  private getRatingParam(rating?: number): HttpParams {
    return new HttpParams()
      .set("averageRating", rating?.toString());
  }
}
