import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
declare var Uikit;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  cartForm: FormGroup;
  cartTotal: number;
  


  constructor(private productService: ProductService, private fb: FormBuilder) {

  }

  ngOnInit() {


    this.cartItems = this.productService.getCalculateProducts();
    this.cartItems = this.productService._cartItem;

    this.initForm();
    this.cartFormChanges();

  }

  initForm() {
    this.cartForm = this.fb.group({
      items: this.fb.array([])
    })

    this.cartItems.forEach(item => {
    
      (this.cartForm.get('items') as FormArray).push(this.createFormItem(item));
    });
    console.log('Form Array', this.cartItems);
  }

  createFormItem(product: Product): FormGroup {
    return this.fb.group({
      id: product.id,
      qty: [product.productQty, [Validators.max(product.productQty), Validators.min(1)]],
      price: product.productPrice
    });
  }

  get items() {
    return this.cartForm.controls.items as FormArray;
  }

  cartFormChanges() {
    let controlArray = <FormArray>this.cartForm.controls['items'];
    console.log(controlArray);
    const control = <FormArray>this.cartForm.controls['items'];

    for (let i = 0; i < control.length; i++) {
      control.controls[i].get("qty").valueChanges.subscribe(x => {
        this.cartItems[i].productQty = x ;              
      });
    }
    console.log(this.cartItems);
  }

  qty() {
    return this.cartForm.get('qty').value;
  }

  getTotal(): number {
    let total: number = 0;
    let subTotal: number = 0;
    (this.cartForm.get('items') as FormArray).controls.forEach(
      (fg: FormGroup) => {
        total += fg.controls.price.value * fg.controls.qty.value

      });
    subTotal += total;
    return subTotal;
  }
  delete(id: number, i: number) {
    this.cartItems = this.productService.deleteCart(id);
    console.log('Deleted Array', this.cartItems);
    return (<FormArray>this.cartForm.get('items')).removeAt(i)



  }
  checkout() {
    const checkoutTotal = this.getTotal();
    
  }
  getValidity(index: number): boolean {
    this.getTotal();
    return (<FormArray>this.cartForm.get('items')).controls[index].invalid;
  }

}
