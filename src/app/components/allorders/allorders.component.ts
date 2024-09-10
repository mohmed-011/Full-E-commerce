import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { Iorder } from '../../core/interfaces/iorder';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [LimitPipe ,CarouselModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService)
  private readonly _AuthService = inject(AuthService)

  orderList:Iorder[]=[]



  ngOnInit(): void {

    this._AuthService.saveUserData();
    let UserId = this._AuthService.userData.id;


    this._OrdersService.getUserOrders(UserId).subscribe({
      next:(res)=>{
        this.orderList = res
        console.log(this.orderList);
      }
    })
  }

    customOptionsOrder: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    dotsEach:true,
    navSpeed: 700,
    autoplay:true,
    margin:15,
    merge:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      }
    },
    nav: false
  }

}
