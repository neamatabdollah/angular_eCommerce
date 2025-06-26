import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, BadgeModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;
  previousItemCount = 0;
  isDarkMode = false;
  currentRoute = '';

  private cartService = inject(CartService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      const newCount = items.reduce((count, item) => count + item.quantity, 0);

      const badge = document.querySelector('.custom-badge');
      if (badge) {
        badge.classList.remove('animate');
        void (badge as HTMLElement).offsetWidth;
        badge.classList.add('animate');
      }

      this.cartItemCount = newCount;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    this.currentRoute = this.router.url;
    this.isDarkMode = this.themeService.isDarkMode();
  }

  goToCheckout() {
    this.router.navigate(['/cart']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  isActiveRoute(route: string): boolean {
    return route === '/products'
      ? this.currentRoute === '/' || this.currentRoute === '/products'
      : this.currentRoute === route;
  }
}
