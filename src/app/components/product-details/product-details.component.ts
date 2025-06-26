import { MessageService } from 'primeng/api';
// Product Details Component
import { GalleriaModule } from 'primeng/galleria';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyEgpPipe } from '../../pipes/currency-egp.pipe';
import { min } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, GalleriaModule, RatingModule,FormsModule,CurrencyEgpPipe,InputNumberModule,ButtonModule, ProgressSpinnerModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);

      this.messageService.add({
        severity: 'success',
        summary: 'Added to Cart!',
        detail: `${this.product.title} (${this.quantity}) has been added to your cart.`,
        life: 3000
      });
    }
  }

}
