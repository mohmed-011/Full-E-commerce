import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, NgClass } from '@angular/common';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink,CurrencyPipe,LimitPipe,SearchPipe,FormsModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _BrandsService = inject(BrandsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)

  productList:Iproduct[]=[]
  brandList:Ibrand[]=[]
  categoryList:Icategories[]=[]

  getAllProductSub!:Subscription;
  getAllCategoriesSub!:Subscription;

  text:string="";

  WishList:string[]=[]




  ngOnInit(): void {

    this._WishlistService.getProudctWishlist().subscribe({
      next:(res)=>{
        for (const item of res.data) {
          this.WishList.push(item._id);
        }
        this.getAllProductSub =  this._ProductsService.getAllProduct().subscribe({
          next:(res)=>{
            this.productList=res.data;
            console.log(this.productList);
            console.log( this.WishList);
            for (const element of this.productList) {
              for (const element2 of this.WishList) {
                if (element.id === element2) {
                  element.inWishList = true
                  break;
                }
              }
            }

          }
   })

      }
    })




  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{

      this.categoryList = res.data;
      console.log(this.categoryList);
    },
    error:(err)=>{
      console.log(err);

    }
  })
  this._BrandsService.GetAllBrands().subscribe({
    next:(res)=>{

      this.brandList = res.data;
      console.log(this.brandList);
    },
    error:(err)=>{
      console.log(err);

    }
  })
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
  }
  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    dotsEach:true,
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
        items: 6
      }
    },
    nav: false
  }
  customOptionsBrand: OwlOptions = {
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
        items: 6
      }
    },
    nav: false
  }

   customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    nav: false
  }

 

}
