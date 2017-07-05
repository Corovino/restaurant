import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(restaurant: any, search?: any ): any {
    console.log('xx',name);
    if(!search) return  restaurant;
    return restaurant.filter( response => {
         console.log(response)
         return response.store.toLowerCase().includes(search.toLowerCase());
    });
  }

}
