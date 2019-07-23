import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
declare var Uikit;


@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {
  productDetail: Product[];
  cartItem: Product[];
  total: number = 0;

  

  constructor(private productService: ProductService) { 
    this.productDetail = this.productService.productList;
  }

  ngOnInit() {
    
  }
   addToCart(product) {
   this.productService.addToCart(product);
  } 
}
