import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink,LimitPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService)
  productWishList:Iproduct[]=[]
  isEmpty:boolean=true;
  ngOnInit(): void {
    this._WishlistService.getProudctWishlist().subscribe({
      next:(res)=>{
        this.productWishList= res.data;
        console.log( this.productWishList);
        if (this.productWishList.length==0) {
          this.isEmpty=true
        }else{
          this.isEmpty=false
        }
      }
    })
  }

  removrFromWish(id:string){
    this._WishlistService.delfromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.ngOnInit();
        this._WishlistService.wishNumber.set(res.data.length);
        if (res.data.length==0) {
          this.isEmpty=true;
        }
      }
    })
  }
}
