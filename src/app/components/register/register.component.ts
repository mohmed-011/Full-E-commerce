import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy  {


  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  registerSub!:Subscription;

  mgerror:string=""
  isLoding:boolean=false;


  registerForm:FormGroup = new FormGroup({

   name: new FormControl(null ,[Validators.required , Validators.minLength(3), Validators.maxLength(20)]),

   email: new FormControl(null , [Validators.required ,Validators.email]),

   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),

   rePassword: new FormControl(null , ),

   phon: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])

  } , this.confirmPassword)

  confirmPassword(G:AbstractControl){
    if(G.get('password')?.value == G.get('rePassword')?.value ){
      return null;
    }
    else{
      return {mismatch:true}
    }
  }



  registerSubmit():void{

    if(this.registerForm.valid){
      this.isLoding=true;
      this.registerSub =  this._AuthService.setRegisterFoem(this.registerForm.value).subscribe({
        next:(res)=>{
          // move to login
          if(res.message == "success"){
            this._Router.navigate(['/login'])
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

       console.log(this.registerForm);
       console.log(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }
}
