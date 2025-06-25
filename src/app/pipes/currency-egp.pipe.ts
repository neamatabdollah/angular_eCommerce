import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyEgp',
  standalone: true
})
export class CurrencyEgpPipe implements PipeTransform {
  private readonly exchangeRate = 49.90;

  transform(value: number): string {
    if (typeof value !== 'number') return '';

    const egpValue = value * this.exchangeRate;
    return `${egpValue.toFixed(2)} EGP`;
  }
}
