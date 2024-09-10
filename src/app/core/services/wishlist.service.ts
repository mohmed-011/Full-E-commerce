import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient)

   wishNumber:WritableSignal<number> = signal(0)
  // constructor() { }

    addToWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      }
     );
  }

    delfromWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }


    getProudctWishlist():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
}
