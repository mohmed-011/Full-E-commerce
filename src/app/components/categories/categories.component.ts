import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { LimitPipe } from '../../core/pipes/limit.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


  private readonly _CategoriesService = inject(CategoriesService)
  categoryList:Icategories[]=[]

    ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{

      this.categoryList = res.data;
      console.log(this.categoryList);
    },
    error:(err)=>{
      console.log(err);

    }
  })
  }

}
