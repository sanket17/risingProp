import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getjsonobject'
})
export class GetjsonobjectPipe implements PipeTransform {

  transform(value: string, args?: any): any[] {
    // let j = JSON.parse(value);
    console.log("parsing data",JSON.parse(value));
    // console.log("parsing data type",typeof(JSON.parse(JSON.stringify(value)[0].value));
    return JSON.parse(value);

  }

}
