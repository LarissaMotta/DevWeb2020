import { NgModule } from "@angular/core";

import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  imports: [TableModule, InputTextModule],
  exports: [TableModule, InputTextModule],
})
export class PrimengModule {}
