import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _product: Product[];
  _cartItem: Product[] = [];
  _checkoutItem: Product[] = [];
  navbarCount: number = 0;
  totalCart: number;
  totalItems = new EventEmitter<number>();

  constructor() {
    this._product = [
      { id: 1, productName: 'VEDO MODA', productDesc: 'Women Printed Top', productPrice: 899, productImageUrl: './assets/whiteshirt.jpg', productQty: 10 },
      { id: 2, productName: 'INDYA', productDesc: 'Women White Shirts', productPrice: 1000, productImageUrl: './assets/pink.jpg', productQty: 10 },
      { id: 3, productName: 'BIBA', productDesc: 'Pink White Shirt', productPrice: 999, productImageUrl: './assets/white.jpg', productQty: 20 },
      { id: 4, productName: 'INDIANA', productDesc: 'Green Women Shirt', productPrice: 800, productImageUrl: './assets/black.jpg', productQty: 10 }
    ]
  }
  get productList() {
    return this._product;
  }

  addToCart(product: Product) {
    const addedProducts = this._cartItem.find(el => el.id === product.id)
    console.log('Added Products', addedProducts);
    if (addedProducts) {

      addedProducts.productQty++;
      console.log('Quantity Products:', addedProducts.productQty);
    }
    else {
      this._cartItem.push({
        id: product.id,
        productName: product.productName,
        productDesc: product.productDesc,
        productPrice: product.productPrice,
        productQty: product.productQty,
        productImageUrl: product.productImageUrl
      });
    }

    console.log('Cart Item:', this._cartItem); 

    setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(this._cartItem));
      this.calculateProducts();
    }, 1000);

  }
  getCalculateProducts() {
    const products: Product[] = JSON.parse(localStorage.getItem('cart'));
    return products;

  }
  calculateProducts() {
    this.navbarCount = this.getCalculateProducts().length;
   
  }
  /* calculateTotal() {
    const products: Product[] = this.getCalculateProducts();
    this.totalCart = 0;
    products.forEach(el => {
      this.totalCart = el.productQty * el.productPrice;

    });
    return this.totalCart;

  } */
  
  deleteCart(id) {
    const foundId = this._cartItem.findIndex(el => el.id === id)
    console.log('Found Element', foundId);
    if (foundId > -1 ) {
      console.log('foundId', foundId);
      this._cartItem.splice(foundId, 1);
      this.navbarCount = this._cartItem.length;
      console.log('After Deletion', this._cartItem);
    }
    return this._cartItem;
  }
  
}

