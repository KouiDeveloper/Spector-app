import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { A001HeaderComponent } from './a001-header/a001-header.component';
import { A002IndexComponent } from './a002-index/a002-index.component';
import { TestComponent } from './test/test.component';
import { A003ReportComponent } from './a003-report/a003-report.component';
import { A004MakeProductsComponent } from './a004-make-products/a004-make-products.component';
import { A005AddProductsComponent } from './a005-add-products/a005-add-products.component';
import { A006SubtractProductsComponent } from './a006-subtract-products/a006-subtract-products.component';
import { ZFooterComponent } from './z-footer/z-footer.component';
import { B007SttFinanceTableComponent } from './b007-stt-finance-table/b007-stt-finance-table.component';
import { B008SttFinanceTrafficComponent } from './b008-stt-finance-traffic/b008-stt-finance-traffic.component';
import { B009SttFinanceCompareComponent } from './b009-stt-finance-compare/b009-stt-finance-compare.component';
import { C001LoginComponent } from './c001-login/c001-login.component';
import { C002RegisterComponent } from './c002-register/c002-register.component';
import { C003ProfileComponent } from './c003-profile/c003-profile.component';
import { C004SaleComponent } from './c004-sale/c004-sale.component';
import { C005OrderListComponent } from './c005-order-list/c005-order-list.component';
import { C006MakeOrderComponent } from './c006-make-order/c006-make-order.component';
import { C007ListEmployeeComponent } from './c007-list-employee/c007-list-employee.component';
import { C008ChangePasswordComponent } from './c008-change-password/c008-change-password.component';
import { C009MakeProductsToSaleComponent } from './c009-make-products-to-sale/c009-make-products-to-sale.component';

@NgModule({
  declarations: [
    AppComponent,
    A001HeaderComponent,
    A002IndexComponent,
    TestComponent,
    A003ReportComponent,
    A004MakeProductsComponent,
    A005AddProductsComponent,
    A006SubtractProductsComponent,
    ZFooterComponent,
    B007SttFinanceTableComponent,
    B008SttFinanceTrafficComponent,
    B009SttFinanceCompareComponent,
    C001LoginComponent,
    C002RegisterComponent,
    C003ProfileComponent,
    C004SaleComponent,
    C005OrderListComponent,
    C006MakeOrderComponent,
    C007ListEmployeeComponent,
    C008ChangePasswordComponent,
    C009MakeProductsToSaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
