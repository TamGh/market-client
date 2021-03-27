import { Component, OnInit } from '@angular/core';
import { IProductListItem, IResponseModel } from '../models/product.interfaces';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<IProductListItem>;
  isDataAvailable: boolean;
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  private getProducts() {
    this.productService.getAll()
      .subscribe((res: IResponseModel<Array<IProductListItem>>) => {
        this.isDataAvailable = true;
        this.products = res.data;
      })
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userName') != null;
  }

  onDelete(id: number) {
    this.productService.delete(id)
      .subscribe(res => {
        this.isDataAvailable = false;
        this.getProducts();
      })
  }

}
