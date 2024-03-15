import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countSteps',
})
export class CountStepsPipe implements PipeTransform {
  transform(value: any): number {
    if (!value) return 0
    let res = 0;
    value.forEach((element: any) => {
      if (element) {
        res++;
      }
    });
    return res;
  }
}
