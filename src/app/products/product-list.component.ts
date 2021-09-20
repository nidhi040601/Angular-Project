import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    _listFilter: string;                        //We can use ngModel here but this is the better bcoz we want to perform something as value changes
	get listFilter() : string{
		return this._listFilter;
	}
	set listFilter(value: string){
		this._listFilter = value;
		this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
	}

    filteredProducts : IProduct[];

    products: IProduct[] = []            //Its easy to find error in this if we use interface for products

    constructor(private _prodcutService: ProductService){                                //It is the best place to set default values for more complex property 
        this.listFilter = 'cart';
    }

    performFilter(filterBy : string) : IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();                    //Convert it to lowercase
        return this.products.filter((product : IProduct) =>         //Here we find it using indexOf method in which if find means index is instead of '-1' then add it
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message : string) : void{
        this.pageTitle = 'Product List: ' + message;
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void{
        this.products = this._prodcutService.getProducts();            //We can call this service in constructor but later we fill fetch data from database and thus dont wanna include this code in constructor
        this.filteredProducts = this.products;                         //We moved it here from constructor bcoz constructor will execute first n then we get nothing in products.            
    }
}