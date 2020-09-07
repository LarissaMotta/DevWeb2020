import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductComponent } from "./views/product/product.component";
import { LoginComponent } from './views/login/login.component';
import { SupplierComponent } from './views/supplier/supplier.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: ProductComponent },
  { path: "product", component: ProductComponent },
  { path: "supplier", component: SupplierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}