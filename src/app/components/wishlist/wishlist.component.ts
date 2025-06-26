import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { WishlistService } from '../../services/wishlist.service';
import { CurrencyEgpPipe } from '../../pipes/currency-egp.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyEgpPipe,CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlist: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeItem(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
    this.wishlist = this.wishlistService.getWishlist();
  }
}
