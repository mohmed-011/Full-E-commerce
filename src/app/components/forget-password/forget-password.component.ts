import { Component, ElementRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  step:number = 1;
  private readonly _Router = inject(Router);

 private readonly _AuthService= inject(AuthService)
  VerifaEmail:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })


  VerifaCode2:FormGroup = new FormGroup({
    resetCode1:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{1}$/)]),
    resetCode2:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{1}$/)]),
    resetCode3:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{1}$/)]),
    resetCode4:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{1}$/)]),
    resetCode5:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{1}$/)]),
    resetCode6:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{1}$/)])
  })

  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  })


  spet1():void{
    this._AuthService.SetEmailVerifay(this.VerifaEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg == "success"){
        this.resetPassword.get('email')?.patchValue(  this.VerifaEmail.get('email')?.value )
          this.step=2;
        }
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  spet2():void{

    let code ={
      resetCode:this.VerifaCode2.get('resetCode1')?.value + this.VerifaCode2.get('resetCode2')?.value +this.VerifaCode2.get('resetCode3')?.value +this.VerifaCode2.get('resetCode4')?.value +this.VerifaCode2.get('resetCode5')?.value+this.VerifaCode2.get('resetCode6')?.value
    }
    console.log(code);

    this._AuthService.SetCodeVerifay(code).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status == "Success"){
          this.step=3;
        }
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  spet3():void{
    this._AuthService.SetResetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken',res.token)
        this._AuthService.saveUserData()// 2-decode token
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }


}
