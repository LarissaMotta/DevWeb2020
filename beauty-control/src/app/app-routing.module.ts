import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductComponent } from "./views/product/product.component";
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
