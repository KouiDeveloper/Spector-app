import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { A001HeaderComponent } from './a001-header/a001-header.component';
import { AppRoutingModule } from './/app-routing.module';
import { A002IndexComponent } from './a002-index/a002-index.component';
import { TestComponent } from './test/test.component';
import { A003ReportComponent } from './a003-report/a003-report.component';
import { A004MakeProductsComponent } from './a004-make-products/a004-make-products.component';

@NgModule({
  declarations: [
    AppComponent,
    A001HeaderComponent,
    A002IndexComponent,
    TestComponent,
    A003ReportComponent,
    A004MakeProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
