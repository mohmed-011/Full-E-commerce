import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // constructor() { }
  private readonly _HttpClient = inject(HttpClient)

  getAllProduct():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`);
  }
  getAllProductPage(num:number):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=${num}`);
  }

  getSpecificProduct(id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
  getSpecificProducts(id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?category[in]=${id}`);
  }
  getSpecificProductsB(id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?brand=${id}`);
  }
  getSpecificProductsB_C(idB:string | null,idC:string | null):Observable<any>{
    if(idB=='none'&& idC !=='none'){
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?category[in]=${idC}`);
    }
    else if(idB !='none'&& idC =='none'){
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?brand=${idB}`);
    }
    else if(idB !='none'&& idC !='none'){
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?brand=${idB}&category[in]=${idC}`);
    }
    else{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`);
    }

  }

}
