import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, inject, Input, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LimitPipe } from '../../core/pipes/limit.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink,LimitPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)


  @Input()item!:Iproduct

  removrFromWish(id:string){
    this._WishlistService.delfromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._WishlistService.wishNumber.set(res.data.length);
        this.item.inWishList=false;
        this._ToastrService.success('Product Removed from Wishlist')
      }
    })
  }
    addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status == "success") {
          this._ToastrService.success('Product added to your cart')
          this._CartService.cartNumber.set(res.numOfCartItems);
          console.log(this._CartService.cartNumber);

        }

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  addToWish(id:string):void{
    this._WishlistService.addToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res.data.length);
        if (res.status == "success") {
          this._ToastrService.success('Product added to Wishlist')

          this._WishlistService.wishNumber.set(res.data.length);
          this.item.inWishList=true
        }

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
/*Product added successfully to your cart*/
