import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
import { ConvertToSpacesPipe } from '../convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      }
    ]),
    SharedModule
  ]
})
export class ProductModule {}
