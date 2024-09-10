import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/Guards/auth.guard';
import { lodeGuard } from './core/Guards/lode.guard';

export const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',title:'Home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'products',title:'All Products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'cart',title:'Cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then((c) => c.CartComponent),
      },
      {
        path: 'brands',title:'Brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then((c) => c.BrandsComponent),
      },
      {
        path: 'categories',title:'Categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'detalis/:id',title:'Product Detalis',
        loadComponent: () =>
          import('./components/detalis/detalis.component').then(
            (c) => c.DetalisComponent
          ),
      },
      {
        path: 'cdetalis/:id',title:'category Items',
        loadComponent: () =>
          import('./components/c-details/c-details.component').then(
            (c) => c.CDetailsComponent
          ),
      },
      {
        path: 'bdetalis/:id', title:'Brand Items',
        loadComponent: () =>
          import('./components/b-details/b-details.component').then(
            (c) => c.BDetailsComponent
          ),
      },
      {
        path: 'allorders', title:'Orders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
      },
      {
        path: 'wishlist',title:'Wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
      },
      {
        path: 'orders/:cid',title:'Orders',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (c) => c.OrdersComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [lodeGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',title:'Login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',title:'Register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forget',title:'Forget Password',
        loadComponent: () =>
          import('./components/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent
          ),
      },
    ],
  },
  {
    path: '**',title:'Not Found',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
