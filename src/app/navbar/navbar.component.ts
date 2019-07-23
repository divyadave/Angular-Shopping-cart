import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navProduct: Product[];
  

  constructor(private productService: ProductService) {
    this.navProduct = this.productService.getCalculateProducts();
    this.navProduct = this.productService._cartItem;
    console.log('Dropdown Products',this.navProduct);
   }

  ngOnInit() {
  }
  delete(id) {
  this.productService.deleteCart(id);
  }

}
