import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users'
})
export class UserPipe implements PipeTransform {

  transform(restaurant: any, search?: any): any {

    if (!search) return restaurant;
    return restaurant.filter(response => {

      return response.firts_name.toLowerCase().includes(search.toLowerCase());
    });

  }

}
