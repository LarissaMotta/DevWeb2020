import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from '@angular/forms';
import { PrimengModule } from './modules/primeng.module';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./views/header/header.component";
import { FooterComponent } from "./views/footer/footer.component";
import { ProductComponent } from './views/product/product.component';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent, 
    ProductComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
