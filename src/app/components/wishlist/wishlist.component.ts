import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { WishlistService } from '../../services/wishlist.service';
import { CurrencyEgpPipe } from '../../pipes/currency-egp.pipe';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../emptystate/emptystate.component';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyEgpPipe, CommonModule,EmptyStateComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private wishlistService = inject(WishlistService);

  wishlist: Product[] = [];

  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeItem(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
    this.wishlist = this.wishlistService.getWishlist();
  }
}
