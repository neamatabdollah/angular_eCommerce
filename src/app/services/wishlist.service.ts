import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist: Product[] = [];

  getWishlist(): Product[] {
    return this.wishlist;
  }

  addToWishlist(product: Product): void {
    const exists = this.wishlist.find((p) => p.id === product.id);
    if (!exists) {
      this.wishlist.push(product);
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlist = this.wishlist.filter((p) => p.id !== productId);
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.some((p) => p.id === productId);
  }
}


//--------------------------------------
//using Signal Store instead of Service:
//--------------------------------------
// import { Injectable, computed, signal } from '@angular/core';
// import { Product } from '../interfaces/product.interface';
// @Injectable({ providedIn: 'root' })
// export class WishlistService {
//   // signal to save the wishlist products
//   private wishlistSignal = signal<Product[]>([]);

//   // getter
//   readonly wishlist = computed(() => this.wishlistSignal());

//   // Add product to wishlist
//   addToWishlist(product: Product): void {
//     const current = this.wishlistSignal();
//     const exists = current.find((p) => p.id === product.id);

//     if (!exists) {
//       this.wishlistSignal.set([...current, product]);
//     }
//   }

//   // remove product from wishlist
//   removeFromWishlist(productId: number): void {
//     const updated = this.wishlistSignal().filter((p) => p.id !== productId);
//     this.wishlistSignal.set(updated);
//   }

//   //make sure that the product exist or not
//   isInWishlist(productId: number): boolean {
//     return this.wishlistSignal().some((p) => p.id === productId);
//   }
// }
