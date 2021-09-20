import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IProduct } from "./product";
import { jsonpCallbackContext } from "@angular/common/http/src/module";

@Injectable()
export class ProductService {
    private _productUrl = './api/products/products.json';        //Here can define the web address from where we want to fetch data

    constructor(private _http: HttpClient) {}

    getProducts() : Observable<IProduct[]> {      //Now will return a observable of IProduct
        return this._http.get<IProduct[]>(this._productUrl)     //We set generic parameter to IProduct array,when we get the response back this will then automatically map the returned response to an array of product
              .do(data => console.log('All: ' + JSON.stringify(data))   )  
              .catch(this.handleError);
    }

    private handleError(err : HttpErrorResponse){
        console.log(err.message);
        return Observable.throw(err.message);
    }
}