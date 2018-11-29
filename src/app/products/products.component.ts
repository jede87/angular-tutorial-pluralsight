import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductsService } from './products.service';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageTitle = 'Products';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMsg: string;
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(v: string) {
    this._listFilter = v;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productsService: ProductsService) {}
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  onNotify(message: string): void {
    this.pageTitle = `Product List ${message}`;
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => (this.errorMsg = <any>error)
    );
    this.filteredProducts = this.products;
  }
}
