import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Icategories } from '../../core/interfaces/icategories';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-c-details',
  standalone: true,
  imports: [RouterLink , LimitPipe , CardComponent],
  templateUrl: './c-details.component.html',
  styleUrl: './c-details.component.scss'
})
export class CDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ProductsService = inject(ProductsService)

  productList:Iproduct[]=[]

  CatDetails:Icategories={} as Icategories

  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)





  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(data)=>{
      let idCateg =  data.get('id') !;
        console.log(idCateg);

        this._CategoriesService.getSpecificCategories(idCateg).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.CatDetails = res.data
          }
        })
        this._ProductsService.getSpecificProducts(idCateg).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.productList = res.data

          }
        })
      }
    })
  }
}
