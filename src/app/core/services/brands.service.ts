import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
private readonly _HttpClient = inject(HttpClient)
  // constructor() { }

  GetAllBrands():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
  GetSpecificBrand(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`)
  }
}
