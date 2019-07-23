import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  contactForm: FormGroup;
  checkoutItems: Product[];
  

  constructor(private fb: FormBuilder, private productService: ProductService) { 
    this.checkoutItems = this.productService.getCalculateProducts();
    this.checkoutItems = this.productService._cartItem;
   
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNum: this.fb.array([this.phone()]),
      city: [''],
      zipCode: ['']
    });
  
  }
  phone() {
    return this.fb.group({
      phone: ['']
    });
  }
  get phoneNum() {
    return this.contactForm.controls.phoneNum as FormArray;
  }
  get firstName() {
    return this.contactForm.controls.firstName;
  }
  get lastName() {
    return this.contactForm.controls.lastName;
  }
  get email() {
    return this.contactForm.controls.email;
  }
  get address() {
    return this.contactForm.controls.address;
  }
  get city() {
    return this.contactForm.controls.city;
  }
  get zipCode() {
    return this.contactForm.controls.zipCode;
  }
  addPhoneControls() {

    this.phoneNum.push(this.phone());
    

  }
  removePhoneControls(index) {
    if (index > 0) {
      this.phoneNum.removeAt(index);
    }
    else {
      this.phoneNum.reset();
    }

  }
  clearNameControl() {
    this.firstName.reset();
    this.lastName.reset();
  }
  clearEmailIdControl() {
    this.email.reset();
  }
  clearAddressControl() {
    this.address.reset();
  }
  clearZipControl() {
    this.city.reset();
    this.zipCode.reset();
  }

  

}
