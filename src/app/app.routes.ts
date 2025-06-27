// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ProductListComponent } from './components/product-list/product-list.component';
// import { ProductDetailsComponent } from './components/product-details/product-details.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { CartComponent } from './components/cart/cart.component';
// import { CheckoutComponent } from './components/checkout/checkout.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';
// import { WishlistComponent } from './components/wishlist/wishlist.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'products', component: ProductListComponent, pathMatch: 'full' },
//   { path: 'product/:id', component: ProductDetailsComponent, pathMatch: 'full' },
//   { path: 'login', component: LoginComponent, pathMatch: 'full' },
//   { path: 'register', component: RegisterComponent, pathMatch: 'full' },
//   { path: 'cart', component: CartComponent, pathMatch: 'full' },
//   { path: 'wishlist', component: WishlistComponent, pathMatch: 'full' },
//   { path: 'checkout', component: CheckoutComponent, pathMatch: 'full' },
//   { path: '404', component: NotFoundComponent, pathMatch: 'full' },
//   { path: '**', redirectTo: '/404' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'products',
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: '/404' }
];
