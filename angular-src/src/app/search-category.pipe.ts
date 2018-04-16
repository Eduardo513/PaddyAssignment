import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCategory',
  pure: false
})
export class SearchCategoryPipe implements PipeTransform {

  transform(data: any[], searchTerm: string): any[] {
    
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item.category.toUpperCase().indexOf(searchTerm) !== -1 
      });
    
    }
}
