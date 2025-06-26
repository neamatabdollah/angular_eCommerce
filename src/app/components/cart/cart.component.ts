import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyEgpPipe } from '../../pipes/currency-egp.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputNumberModule,
    CurrencyEgpPipe
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); // Refresh UI

    this.messageService.add({
      severity: 'warn',
      summary: 'Removed!',
      detail: 'Product has been removed from your cart.',
      life: 3000
    });
  }


  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
