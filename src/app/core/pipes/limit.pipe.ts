import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
  standalone: true
})
export class LimitPipe implements PipeTransform {

  transform(text:string , term:number): unknown {
    return text.split(" ", term).join(" ");
  }

}
