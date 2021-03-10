import { endpoints } from './../routes/report.route';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductWorkflow } from '../models/product-workflow.model';

@Injectable({
  providedIn: "root",
})
export class ReportService {

  constructor(private http: HttpClient) {}

  public getProductWorkFlow(start?: Date, end?: Date): Observable<ProductWorkflow> {
    const params = new HttpParams();
    this.setRangeDateParams(params, start, end);

    return this.http.get<ProductWorkflow>(
      endpoints.productWorkflow, 
      { params }
    );
  }

  private setRangeDateParams(params: HttpParams, start?: Date, end?: Date): void {
    if (start) {
      params.set("startDate", start.toISOString());
    }

    if (end) {
      params.set("endDate", end.toISOString());
    }
  }
}
