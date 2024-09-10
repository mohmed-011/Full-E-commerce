import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)
  cartId:string|null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
      this.cartId =  params.get('cid')
      console.log(this.cartId);

      }
    })
  }

  mgerror:string=""
  isLoding:boolean=false;

  order:FormGroup = new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required]),

  })

  orderSubmit():void{

    this._OrdersService.checkOut(this.cartId ,this.order.value ).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status == "success") {

          window.open(res.session.url , "_self")
        }

      }
    })
    console.log(this.order.value);

  }
}
