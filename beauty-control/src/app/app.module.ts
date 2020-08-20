import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { PrimengModule } from './modules/primeng.module';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./views/header/header.component";
import { FooterComponent } from "./views/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    AppRoutingModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
