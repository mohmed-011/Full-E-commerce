import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const lodeingInterceptor: HttpInterceptorFn = (req, next) => {
 const _NgxSpinnerService = inject(NgxSpinnerService)

_NgxSpinnerService.show();
  return next(req).pipe(finalize(  ()=>{
    _NgxSpinnerService.hide();
  }  ));
};
