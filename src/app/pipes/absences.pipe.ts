import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absences'
})
export class AbsencesPipe implements PipeTransform {

  transform(restaurant: any, search?: any): any {

    if (!search) return restaurant;
    return restaurant.filter(response => {

      return response.employee.toLowerCase().includes(search.toLowerCase());
    });

  }

}
