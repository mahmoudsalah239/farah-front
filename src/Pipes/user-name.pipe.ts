import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userName',
  standalone: true
})
export class UserNamePipe implements PipeTransform {

  transform(value: string): string {
    let name = value.split('@')[0].toLocaleUpperCase();
    return name;
  }

}
