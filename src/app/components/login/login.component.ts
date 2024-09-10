import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,  RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  mgerror:string=""
  isLoding:boolean=false;


  loginForm:FormGroup = new FormGroup({


   email: new FormControl(null , [Validators.required ,Validators.email]),

   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),


  })





  loginSubmit():void{

    if(this.loginForm.valid){
      this.isLoding=true;
      this._AuthService.setloginFoem(this.loginForm.value).subscribe({
        next:(res)=>{
          // move to login
          if(res.message == "success"){

            localStorage.setItem('userToken',res.token) // 1-save token

            this._AuthService.saveUserData()// 2-decode token

            this._Router.navigate(['/home']) // 3-navigate to home
            console.log(res);

          }

          console.log(res);
          this.isLoding=false;

        },
        error:(err:HttpErrorResponse)=>{
          // show error in html to user
          this.mgerror = err.error.message;
          this.isLoding=false;

          console.log(err);

        }
      })

       console.log(this.loginForm);
       console.log(this.loginForm.value);
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
