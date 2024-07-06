import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 12) {
      return value.split('').join('').slice(0, 12);
    }
    let name = value.split('@')[0].toLocaleUpperCase();
    return name;
  }
}
