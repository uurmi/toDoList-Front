import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../_models/Ticket';

@Pipe({
  name: 'sortByPosition'
})
export class SortByPositionPipe implements PipeTransform {

  transform(value?: Ticket[]): Ticket[] {
    if (!value) return []
    return value.sort((a, b) => {
      if (a.position == b.position) {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) 
      }
      return (a.position - b.position)
    })
  }

}
