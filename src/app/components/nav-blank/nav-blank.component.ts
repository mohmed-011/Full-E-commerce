import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, Inject, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{

  constructor(private _FlowbiteService:FlowbiteService){}
  private readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  countNumber:Signal<number> = computed( ()=>this._CartService.cartNumber() );
  wishNumber:Signal<number> = computed( ()=>this._WishlistService.wishNumber() );









  ngOnInit(): void {
   this._FlowbiteService.loadFlowbite(()=>{
    console.log("FlowbiteService");
   })

   this._CartService.getProudctCart().subscribe({
    next:(res)=>{
      this._CartService.cartNumber.set(res.numOfCartItems)
    }
   })
   this._WishlistService.getProudctWishlist().subscribe({
    next:(res)=>{
      this._WishlistService.wishNumber.set(res.data.length)
    }
   })


  // this._CartService.cartNumber.subscribe({
  //   next:(res)=>{
  //     this.countNumber = res;
  //   }
  // });
  }

  hmada():void{
    this._AuthService.logOut()
  }

}
