import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Imeta } from '../../core/interfaces/imeta';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CategoriesService } from '../../core/services/categories.service';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { Icategories } from '../../core/interfaces/icategories';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink , CurrencyPipe , LimitPipe ,SearchPipe , FormsModule ,CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // private readonly _FlowbiteService = inject(FlowbiteService)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
    private readonly _CategoriesService = inject(CategoriesService)
  private readonly _BrandsService = inject(BrandsService)
getAllProductSub!:Subscription;
text:string="";
brand:string="";
category:string="";
productList:Iproduct[]=[]
brandList:Ibrand[]=[]
categoryList:Icategories[]=[]
WishList:string[]=[]
metaData:Imeta = {} as Imeta
@ViewChild('ser') ser!:ElementRef;
@ViewChild('cat') cat!:ElementRef;
@ViewChild('bar') bar!:ElementRef;

ngOnInit(): void {


this._WishlistService.getProudctWishlist().subscribe({

      next:(res)=>{

        for (const item of res.data) {
          this.WishList.push(item._id);
        }

        this.getAllProductSub =  this._ProductsService.getAllProduct().subscribe({
          next:(res)=>{
            this._NgxSpinnerService.show();
            this.productList=res.data;
            this.metaData = res.metadata
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
            this._NgxSpinnerService.hide();
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




  page(page:number):void{
    this._ProductsService.getAllProductPage(page).subscribe({
    next:(res)=>{
      this.productList=res.data;
      this.metaData=res.metadata
    }
    })
  }
  nextPage():void{
    if (this.metaData.nextPage) {
    let page = this.metaData.nextPage
    this._ProductsService.getAllProductPage(page).subscribe({
    next:(res)=>{
      this.productList=res.data;
      this.metaData=res.metadata
    }
    })
    }
  }
  prePage():void{
    if (this.metaData.prevPage) {
    let page = this.metaData.prevPage
    this._ProductsService.getAllProductPage(page).subscribe({
    next:(res)=>{
      this.productList=res.data;
      this.metaData=res.metadata
    }
    })
    }
  }

  filter():void{

      this._ProductsService.getSpecificProductsB_C(this.bar.nativeElement.value,this.cat.nativeElement.value).subscribe({
        next:(res)=>{
          this.productList=res.data;
            this.metaData = res.metadata
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
  reset():void{
    this.ser.nativeElement.value = ""

        this.getAllProductSub =  this._ProductsService.getAllProduct().subscribe({
          next:(res)=>{
            this._NgxSpinnerService.show();
            this.productList=res.data;
            this.metaData = res.metadata
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
            this._NgxSpinnerService.hide();
          }
   })
  }
}
