import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipePipe implements PipeTransform {
 
  transform(data: any[], searchTerm: string): any[] {
  
    searchTerm = searchTerm.toUpperCase();
    return data.filter(item => {
      return item.title.toUpperCase().indexOf(searchTerm) !== -1 
    });
  
  }

}
