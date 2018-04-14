import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  title;
  author;
  category;
  image;
  discount;
  stock;
  price;
  user = JSON.parse(localStorage.getItem('user'));
  allItems = []

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
    
  }

  onCreateItemSubmit()
  {
    const newItem = {
      title: this.title,
      author: this.author,
      category: this.category,
      image: this.image,
      discount: this.discount,
      stock: this.stock,
      price: this.price
    }

    this.authService.createItem(newItem).subscribe(data =>{
      if(data.success)
      {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
      }
      else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-false', timeout: 3000});
      }
    })


  }

}
