import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productDetail: Product[];

  constructor(private productService: ProductService ) {
    this.productDetail = this.productService.productList;
   }

  ngOnInit() {
  }

}
