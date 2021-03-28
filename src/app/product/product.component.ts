import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, IResponseModel, ResponseType } from '../models/product.interfaces';
import { ProductService } from '../services/product.service';
import { DecimalPatternValidator } from '../validators/decimal.pattern.validator';
import { OnlyNumbersValidator } from '../validators/only.numbers.validator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  isCreateMode: boolean = true;
  submitted = false;
  product: IProduct;

  constructor(public formBuilder: FormBuilder,
    public productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      this.activatedRoute.params.subscribe(param => {
        if(param['id']) {
          this.isCreateMode = false;
          this.getProductById(param['id']);
        }
      })
    }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      price: [null, [
        Validators.required, 
        (control: AbstractControl) => OnlyNumbersValidator.validate(control),
        (control: AbstractControl) => DecimalPatternValidator.validate(control, 8, 4)]],
      available: [true],
      description: [null, Validators.required],
      dateCreated: [null]
    });
  }

  getProductById(id: number) {
    this.productService.getById(id)
      .subscribe((res: IResponseModel<IProduct>) => {
        this.product = res.data;

        this.productForm.get('id').patchValue(id);
        this.productForm.get('name').patchValue(this.product.name);
        this.productForm.get('price').patchValue(this.product.price);
        this.productForm.get('available').patchValue(this.product.available);
        this.productForm.get('description').patchValue(this.product.description);
        this.productForm.get('dateCreated').patchValue(this.product.dateCreated);

        if(!this.isLoggedIn()) 
        {
          this.productForm.disable();
        }
      })
  }

  onCreate() {
    this.submitted = true;
    if(this.productForm.valid) {
      this.productService.add(this.createBody())
      .subscribe((res: IResponseModel<any>) => {
        if(res.responseType === ResponseType.Success) {
          setTimeout(() => {
            this.router.navigate(['']);
          }, 1000);
        }
        else {
          alert(res.message);
        }
      })
    }
  }

  onUpdate() {
    this.submitted = true;
    if(this.productForm.valid) {
      this.productService.update(this.createBody())
      .subscribe((res: IResponseModel<any>) => {
        if(res.responseType === ResponseType.Success) {
          setTimeout(() => {
            this.router.navigate(['']);
          }, 1000);
        }
        else {
          alert(res.message);
        }
      })
    }
  }

  private createBody(): IProduct {
    const product : IProduct ={
      id: this.productForm.get('id').value? Number(this.productForm.get('id').value) : null,
      name: this.productForm.get('name').value,
      price: this.productForm.get('price').value,
      available: this.productForm.get('available').value,
      description: this.productForm.get('description').value
    }
    return product;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userName') != null;
  }

}
