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

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    CardModule,
    RatingModule,
    ButtonModule,
    CurrencyEgpPipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  onProductClick(){
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart(event: Event){
    event.stopPropagation();
    this.cartService.addToCart(this.product);
    // this.router.navigate(['/checkout']);
  }
}
