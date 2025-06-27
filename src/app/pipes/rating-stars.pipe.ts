import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingStars'
})
export class RatingStarsPipe implements PipeTransform {

  transform(value: number): string {
    return '★'.repeat(Math.round(value)) + '☆'.repeat(5 - Math.round(value));
  }
}
