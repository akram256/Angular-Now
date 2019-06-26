import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service'

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    title = 'Product-list';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = '';

    // tslint:disable-next-line:variable-name
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: IProduct[];
    products: IProduct[] = [];
// """our method won't have a return type that why we use void"""
toggleImage(): void {
    this.showImage = !this.showImage;
}
constructor(private productService:ProductService) {
   
}
onRatingClicked(message: string): void {
     this.title = 'Product List:' + message;
}
performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((
        product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
ngOnInit(): void {
    this.productService.getproduct().subscribe(
        product => {
        this.products= this.products;
        this.filteredProducts = this.products;
        },
        error => this.errorMessage =<any>error
    );
   
}
};
