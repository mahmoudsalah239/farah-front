import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dots',
  standalone: true
})
export class DotsPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length>=20)
      return value.slice(0,15)+"..."
    else
    return value;
  }

}
