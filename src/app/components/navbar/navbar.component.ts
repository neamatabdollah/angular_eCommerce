// Navbar Component
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule,BadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  cartItemCount = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Products',
        icon: 'pi pi-shopping-bag',
        routerLink: '/products',
        styleClass: this.router.url === '/products' ? 'active-link' : ''
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
        styleClass: this.router.url === '/login' ? 'active-link' : ''
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/register',
        styleClass: this.router.url === '/register' ? 'active-link' : ''
      },
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        routerLink: '/cart',
        styleClass: this.router.url === '/cart' ? 'active-link' : ''
      }
    ];

    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

}
