import { StatusProduct } from "./../enums/status-product.enum";
import Product from "../models/product.model";
import ProductStockLog from "src/app/models/product-stock-log.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { endpoints } from "../routes/product.route";
import { ProductSupplier } from "../models/product-supplier.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService extends BaseService<Product> {
  constructor(protected http: HttpClient) {
    super(http, endpoints.baseUrl);
  }

  createProductSupplier(
    productSupplier: ProductSupplier
  ): Observable<ProductSupplier> {
    return this.http.post<ProductSupplier>(
      endpoints.productSupplier,
      JSON.stringify(productSupplier),
      this.httpOptions
    );
  }

  creditProduct(productInput: ProductStockLog): Observable<ProductStockLog> {
    return this.buildProductStockLogRequestObj(productInput);
  }

  debitProduct(productOutput: ProductStockLog): Observable<ProductStockLog> {
    return this.buildProductStockLogRequestObj(productOutput);
  }

  getProductStatus(product: Product): StatusProduct {
    if (product.quantity <= 0) return StatusProduct.OUT_OF_STOCK;
    if (product.quantity > product.runnigOutOfStock) return StatusProduct.IN_STOCK;
    return StatusProduct.RUNNIG_OUT_OF_STOCK;
	}

  private buildProductStockLogRequestObj(productLog: ProductStockLog): Observable<ProductStockLog> {
    const obj: any = {
      product: productLog.product.id,
      supplier: productLog.supplier ? productLog.supplier.id : null,
      quantity: productLog.quantity,
      status: productLog.status,
      date: new Date()
    };

    return this.http.post<ProductStockLog>(
			endpoints.productStockLog,
			JSON.stringify(obj),
			this.httpOptions
    );
  }
}
