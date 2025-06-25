import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { ThemeService } from '../../services/theme.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, BadgeModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  cartItemCount = 0;
  isDarkMode = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Subscribe to cart changes
    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });

    // Update menuItems based on current route
    this.updateMenuItems();

    // Subscribe to route changes to update active link
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenuItems();
      }
    });

    // Theme
    this.isDarkMode = this.themeService.isDarkMode();
  }

  updateMenuItems() {
    const currentUrl = this.router.url;

    this.menuItems = [
      {
        label: 'Products',
        icon: 'pi pi-shopping-bag',
        routerLink: '/products',
        styleClass: currentUrl === '/products' ? 'active-link' : ''
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
        styleClass: currentUrl === '/login' ? 'active-link' : ''
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/register',
        styleClass: currentUrl === '/register' ? 'active-link' : ''
      },
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        routerLink: '/cart',
        styleClass: currentUrl === '/cart' ? 'active-link' : ''
      }
    ];
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }
}

