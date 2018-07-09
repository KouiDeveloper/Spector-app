import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { A002IndexComponent } from './a002-index/a002-index.component';
import { TestComponent } from './test/test.component';
import { A003ReportComponent } from './a003-report/a003-report.component';
import { A004MakeProductsComponent } from './a004-make-products/a004-make-products.component';
import { A005AddProductsComponent } from './a005-add-products/a005-add-products.component';
import { A006SubtractProductsComponent } from './a006-subtract-products/a006-subtract-products.component';

const routes: Routes = [
  { path: '', component: A002IndexComponent },
  { path: 'test', component: TestComponent},
  { path: 'report', component: A003ReportComponent},
  { path: 'make-product', component: A004MakeProductsComponent},
  { path: 'add-products', component: A005AddProductsComponent},
  { path: 'subtract-products', component: A006SubtractProductsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
