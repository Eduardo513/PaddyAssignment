import { Component, OnInit, ElementRef, Pipe, PipeTransform, ViewChild } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Sort} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  itemList = []
  orderByField = 'title';
  reverseSort = false;
  sortedData;
  @ViewChild('titleInput')
  titleInput: ElementRef;
  @ViewChild('authorInput')
  authorInput: ElementRef;
  @ViewChild('categoryInput')
  categoryInput: ElementRef;
  titleData:any[];
  authorData:any[];
  data:any[];

  constructor( private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router,) { }

  ngOnInit() {
  
    let eventObservable = Observable.fromEvent(this.titleInput.nativeElement, 'keyup')
    eventObservable.subscribe();

    let authorEventObservable = Observable.fromEvent(this.authorInput.nativeElement, 'keyup')
    authorEventObservable.subscribe();

    let categoryEventObservable = Observable.fromEvent(this.categoryInput.nativeElement, 'keyup')
    categoryEventObservable.subscribe();
 
    this.getAllItems();
  }

  viewItem(item){
    this.router.navigate(['/item-details', { itemId: item._id }]);
  }

  sortData(sort: Sort) {
    const data = this.itemList.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'author': return compare(+a.author, +b.author, isAsc);
        case 'category': return compare(+a.category, +b.category, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'stock': return compare(+a.stock, +b.stock, isAsc);
        case 'discount': return compare(+a.discount, +b.discount, isAsc);
        default: return 0;
      }
    });
    
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
  }


  getAllItems(){
    this.authService.getAllItems().subscribe(data =>{
      if(data.success)
      {
     this.itemList = data.items;
     this.sortedData = this.itemList.slice()
      }
      else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-false', timeout: 3000});
      }
    });
  }
  
}
