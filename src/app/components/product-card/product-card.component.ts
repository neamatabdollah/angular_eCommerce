import { Component, Input, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CurrencyEgpPipe } from '../../pipes/currency-egp.pipe';
import { WishlistService } from '../../services/wishlist.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    CardModule,
    RatingModule,
    ButtonModule,
    CurrencyEgpPipe,
    ToastModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  isWishlisted = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isWishlisted = this.wishlistService.isInWishlist(this.product.id);
  }
  onProductClick(){
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.product);

    this.messageService.add({
      severity: 'success',
      summary: 'Added to Cart!',
      detail: `${this.product.title} has been added to your cart.`,
      life: 3000
    });
  }


  toggleWishlist(event: Event): void {
    event.stopPropagation();

    if (this.isWishlisted) {
      this.wishlistService.removeFromWishlist(this.product.id);
      this.messageService.add({
        severity: 'info',
        summary: 'Removed from Wishlist!',
        detail: 'Product removed from your wishlist',
        life: 3000
      });
    } else {
      this.wishlistService.addToWishlist(this.product);
      this.messageService.add({
        severity: 'success',
        summary: 'Added to Wishlist!',
        detail: 'Product Added to your wishlist',
        life: 3000
      });
    }

    this.isWishlisted = !this.isWishlisted;
  }

}
