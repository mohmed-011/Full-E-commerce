import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { Icategories } from '../../core/interfaces/icategories';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../core/services/brands.service';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-b-details',
  standalone: true,
  imports: [RouterLink,LimitPipe,CardComponent],
  templateUrl: './b-details.component.html',
  styleUrl: './b-details.component.scss'
})
export class BDetailsComponent {
 private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _BrandsService = inject(BrandsService)
  private readonly _ProductsService = inject(ProductsService)

  productList:Iproduct[]=[]

  BrandDetails:Icategories={} as Icategories

  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)




  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(data)=>{
      let idCateg =  data.get('id') !;
        console.log(idCateg);

        this._BrandsService.GetSpecificBrand(idCateg).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.BrandDetails = res.data
          }
        })
        this._ProductsService.getSpecificProductsB(idCateg).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.productList = res.data

          }
        })
      }
    })
  }
}
