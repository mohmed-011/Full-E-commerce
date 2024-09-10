import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient )  { }
  private readonly _Router = inject(Router)

  userData:any = null

  setRegisterFoem(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data);
  }

  setloginFoem(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data);
  }

  saveUserData():void{
    if(localStorage.getItem('userToken') !=null){

    this.userData =  jwtDecode(  localStorage.getItem('userToken')!  )
      console.log("userData" , this.userData);

    }
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData=null;
    this._Router.navigate(['/login'])
  }

  SetEmailVerifay(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }


  SetCodeVerifay(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }


  SetResetPass(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }


}
