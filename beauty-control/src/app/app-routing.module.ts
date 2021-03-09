import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductComponent } from "./views/product/product.component";
import { LoginComponent } from "./views/login/login.component";
import { SupplierComponent } from "./views/supplier/supplier.component";
import { UserComponent } from "./views/user/user.component";
import { ReportComponent } from './views/report/report.component';

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", component: ProductComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "home", component: ProductComponent, canActivate: [AuthGuard] },
  { path: "product", component: ProductComponent, canActivate: [AuthGuard] },
  { path: "supplier", component: SupplierComponent, canActivate: [AuthGuard] },
  { path: "user", component: UserComponent, canActivate: [AuthGuard] },
  { path: "report", component: ReportComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
