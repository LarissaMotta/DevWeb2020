import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductComponent } from "./views/product/product.component";
import { LoginComponent } from "./views/login/login.component";
import { SupplierComponent } from "./views/supplier/supplier.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: ProductComponent, canActivate: [AuthGuard] },
  { path: "product", component: ProductComponent, canActivate: [AuthGuard] },
  { path: "supplier", component: SupplierComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
