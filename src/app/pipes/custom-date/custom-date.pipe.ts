import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): unknown {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  }
}
