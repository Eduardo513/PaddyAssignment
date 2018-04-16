import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  title;
  author;
  category;

  discount;
  stock;
  price;
  user = JSON.parse(localStorage.getItem('user'));
  allItems = []
  myLogo;

  logos = [
    { logo: 'assets/images/bookLogo.png', bookType: "normalBook" },
    { logo: '/assets/images/eBookReal.png', bookType: "eBook" },
    { logo: '/assets/images/audioBookReal.png', bookType: "audioBook" }]


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      var addclass = 'color';
      var $cols = $('.divs').click(function (e) {
        $cols.removeClass(addclass);
        $(this).addClass(addclass);
      });

      $('img').click(function () {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
      });
    });

  }

  onCreateItemSubmit() {

    var chosenLogo = this.myLogo;
    var chosenLogoLocation;
    if (chosenLogo != undefined) {
      this.logos.forEach(function (logoObject) {
        if (logoObject.bookType == chosenLogo) {
          chosenLogoLocation = logoObject.logo
        }
      });
    }

      const newItem = {
        title: this.title,
        author: this.author,
        category: this.category,
        image: chosenLogoLocation,
        discount: this.discount,
        stock: this.stock,
        price: this.price
      }
      //Required Fields
     if(!this.validateService.validateCreateItem(newItem))
     {
       this.flashMessage.show('Please Fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
     }

      this.authService.createItem(newItem).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        }
        else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-false', timeout: 3000 });
        }
      })


    }

  }
