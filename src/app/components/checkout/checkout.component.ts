import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyEgpPipe } from '../../pipes/currency-egp.pipe';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyEgpPipe,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private cartService = inject(CartService); 

  cartItems: CartItem[] = [];
  total = 0;

  name = '';
  address = '';
  phone = '';

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
  }

  placeOrder() {
    if (this.name && this.address && this.phone) {
      alert('Order placed successfully!');
      this.cartService.clearCart();
    } else {
      alert('Please fill in all the details');
    }
  }
}
