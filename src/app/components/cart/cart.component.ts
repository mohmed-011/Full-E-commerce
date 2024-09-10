import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { log } from 'console';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { LimitPipe } from '../../core/pipes/limit.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink , LimitPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  cartDetails:Icart = {} as Icart
  isEmpty:boolean=true;
  ngOnInit(): void {

    // this._NgxSpinnerService.show();
    this._CartService.getProudctCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data
        if (res.data.products.length==0) {
          this.isEmpty=true;
        }else{
          this.isEmpty=false;
        }
        // this._NgxSpinnerService.hide();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  removeItem(id:string){
    this._CartService.delfromCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data
        if (res.status == "success") {
          this._ToastrService.success("Removed successfully")
          this._CartService.cartNumber.set(res.numOfCartItems)
          if (res.numOfCartItems ==0) {
            this.isEmpty=true;
          }
        }

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  updateCount(id:string , count:number){
    this._CartService.ubdateProduct(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data
        if (res.status == "success") {
          this._ToastrService.success("UPdated successfully")
        }
      },
      error(err) {
        console.log(err);
      }
    })
  }
  clearItems():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if (res.message=='success') {
          this.cartDetails = {}  as Icart;
          this._CartService.cartNumber.set(0)
          this.isEmpty=true
        }
      },
      error(err) {
        console.log(err);
      }
    })
  }
}
