import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDifference',
})
export class DateDifferencePipe implements PipeTransform {
  transform(value: Date): string {
    let nowDate = new Date();
    let deadline = new Date(value);
    let difference = new Date(deadline.getTime() - nowDate.getTime());
    if (deadline < nowDate) return 'Deadline passed';
    if (difference.getDate() == 2) return `Due tomorrow`;
    if (difference.getDate() == 1) {
      if (difference.getHours() == 2) return 'Due in one hour';
      if (difference.getHours() == 1) return `Due in ${difference.getMinutes()} minutes`;
      return `Due in ${difference.getHours()} hours`;
    } else return `Due in ${difference.getDate()} days`;
  }
}
