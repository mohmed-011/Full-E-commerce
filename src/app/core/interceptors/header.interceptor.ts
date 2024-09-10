import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {



  if (localStorage.getItem('userToken')) {

    if (req.url.includes('cart')) {

    }

    req = req.clone({
      setHeaders :{token :localStorage.getItem('userToken')! }
    })
    
  }
  return next(req);
};
