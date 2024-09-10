import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // constructor() { }

  private readonly _HttpClient = inject(HttpClient)

  userToken:any = { token :localStorage.getItem("userToken") }



  cartNumber:WritableSignal<number> = signal(0)



  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,

      {
        "productId": id
      }
      ,
      {
        headers: this.userToken
      }
     );
  }
  delfromCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers: this.userToken
      }
     );
  }
  ubdateProduct(id:string , newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },
      {
        headers: this.userToken
      }
     );
  }
  getProudctCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers: this.userToken
      }
     );
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
        headers: this.userToken
      }
     );
  }
}
