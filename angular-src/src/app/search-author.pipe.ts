import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAuthor',
  pure: false
})
export class SearchAuthorPipe implements PipeTransform {

  transform(data: any[], searchTerm: string): any[] {
    
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item.author.toUpperCase().indexOf(searchTerm) !== -1 
      });
    
    }

}
