import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService)
  brandsList:Ibrand[]=[]

  ngOnInit(): void {
    this._BrandsService.GetAllBrands().subscribe({
      next:(res)=>{
        this.brandsList = res.data;
        console.log(this.brandsList);
      }
    })
  }

}
