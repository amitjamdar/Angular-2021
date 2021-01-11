import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchValue:any): any {
    if (!searchValue) return value;
    return value.filter((v:any) => v.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.id.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
  }

}
