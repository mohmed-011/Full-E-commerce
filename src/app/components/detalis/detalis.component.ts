import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../card/card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detalis',
  standalone: true,
  imports: [RouterLink,LimitPipe ,CarouselModule,CardComponent ,CurrencyPipe],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalisComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)

  detalisProduct:Iproduct = {} as Iproduct
  ProductListC:Iproduct[] = []

  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status == "success") {
          this._ToastrService.success(res.message)
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
          this._ToastrService.success(res.message)
          this._WishlistService.wishNumber.set(res.data.length);
        }

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(data)=>{
      let idProduct =  data.get('id');
        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next:(res)=>{
            this.detalisProduct = res.data;
            console.log(res.data);
            let CatId = res.data.category._id;
            console.log(CatId);
            this._ProductsService.getSpecificProducts(CatId).subscribe({
              next:(res)=>{
                this.ProductListC = res.data;
                console.log(this.ProductListC);
              }
            })

          },
          error:(err)=>{
            console.log(err);

          }
        })
      }
    })
  }

  customOptionsRela: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    dotsEach:false,
    navSpeed: 700,
    autoplay:true,
    margin:8,
    merge:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 5
      }
    },
    nav: false
  }

}
