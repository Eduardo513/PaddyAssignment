import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  itemList = []

  constructor( private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
    this.getAllItems();
  }

  viewItem(item){
    this.router.navigate(['/item-details', { item: item }]);
  }


  getAllItems(){
    this.authService.getAllItems().subscribe(data =>{
      if(data.success)
      {
     this.itemList = data.items;
      }
      else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-false', timeout: 3000});
      }
    });
  }
  
}
