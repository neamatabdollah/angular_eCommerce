import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    );
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}



// using signal
// import { Injectable, computed, signal } from '@angular/core';
// import { CartItem, Product } from '../interfaces/product.interface';

// @Injectable({ providedIn: 'root' })
// export class CartService {
//   private cartItems = signal<CartItem[]>([]);

//   // Public read-only signal to subscribe to
//   readonly cart$ = this.cartItems.asReadonly();

//   // Computed signal for total price
//   readonly totalPrice = computed(() =>
//     this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0)
//   );

//   addToCart(product: Product, quantity: number = 1) {
//     const items = this.cartItems();
//     const index = items.findIndex(item => item.product.id === product.id);

//     if (index !== -1) {
//       const updatedItems = [...items];
//       updatedItems[index] = {
//         ...updatedItems[index],
//         quantity: updatedItems[index].quantity + quantity
//       };
//       this.cartItems.set(updatedItems);
//     } else {
//       this.cartItems.set([...items, { product, quantity }]);
//     }
//   }

//   removeFromCart(productId: number) {
//     this.cartItems.update(items => items.filter(item => item.product.id !== productId));
//   }

//   updateQuantity(productId: number, quantity: number) {
//     this.cartItems.update(items =>
//       items.map(item =>
//         item.product.id === productId ? { ...item, quantity } : item
//       )
//     );
//   }

//   getCartItems(): CartItem[] {
//     return this.cartItems();
//   }

//   getTotalPrice(): number {
//     return this.totalPrice();
//   }

//   clearCart() {
//     this.cartItems.set([]);
//   }
// }

