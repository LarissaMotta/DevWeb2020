import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "./modules/primeng.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./views/header/header.component";
import { FooterComponent } from "./views/footer/footer.component";
import { LoginComponent } from "./views/login/login.component";
import { ProductComponent } from "./views/product/product.component";
import { SupplierComponent } from "./views/supplier/supplier.component";
import { UserComponent } from "./views/user/user.component";

import { TokenInterceptor } from "./interceptors/token.interceptor";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";
import { ReportComponent } from './views/report/report.component';
import { UserReportComponent } from './views/report/user-report/user-report.component';
import { ProductReportComponent } from './views/report/product-report/product-report.component';
import { SupplierReportComponent } from './views/report/supplier-report/supplier-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductComponent,
    SupplierComponent,
    UserComponent,
    ReportComponent,
    UserReportComponent,
    ProductReportComponent,
    SupplierReportComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
