import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartProductComponent } from './cart-product/cart-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  { path: "list", component: CartProductComponent },
  { path: "", component: ProductListComponent},
  { path: "cart", component: CartComponent},
  { path: "checkout", component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
