import { Component, OnInit, Input } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  editItem = false;
  @Input('itemId') item: any;
  newReview;
  itemObject;
  ratingOptions = ['1', '2', '3', '4', '5']
  selectedRating;
  allReviews = [];
  private sub: any;
  title;
  author;
  image;
  category;
  price;
  stock;
  discount;
  myLogo;
    logos = [
      { logo: 'assets/images/bookLogo.png', bookType: "normalBook" },
      { logo: '/assets/images/eBookReal.png', bookType: "eBook" },
      { logo: '/assets/images/audioBookReal.png', bookType: "audioBook" }]
  user = JSON.parse(localStorage.getItem('user'));
  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

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
  
    this.sub = this.route.params.subscribe(params => {
      const item = {
        id: params['itemId']
      }
      this.authService.getItemById(item).subscribe(data => {
        if (data.success) {
          this.itemObject = data.itemObject;
          this.getAllReviews();
          this.updateItem(this.itemObject);
        }
        else
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      })

    });
    
  }
 

  addToCart() {
    const itemCartDetails = {
      itemId: this.itemObject,
      userId: this.user.id
    }
    this.authService.addItemToCart(itemCartDetails).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
      }
      else
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });


    });
  }

  backClicked() {
    this._location.back();
  }

  toggleEditItemOn() {
    this.editItem = true;
  }

  toggleEditItemOff() {
    this.editItem = false;
  }

  confirmEdit(){
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
      id: this.itemObject._id,
      title: this.title,
      author: this.author,
      category: this.category,
      discount: this.discount,
      stock: this.stock,
      price: this.price,
      image : chosenLogoLocation
    }
    this.authService.editItem(newItem).subscribe(data => {
      if (data.success) {
        
       this.updateItem(data.editedItem);
        this.toggleEditItemOff();
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
      }
      else
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });

    });
  }

  updateItem(currentItem) {
    this.title = currentItem.title
    this.author = currentItem.author;
    this.category = currentItem.category;
    this.price = currentItem.price;
    this.stock = currentItem.stock;
    this.discount = currentItem.discount;
    this.image = currentItem.image;
    
  }

  getAllReviews() {
    const item = {
      id: this.itemObject._id
    }
    this.authService.getAllReviewsForItem(item).subscribe(data => {
      if (data.success) {
        this.allReviews = data.allReadableReviewObjects;
        
      }
    
        

    });

  }

  isUserAdmin() {
    if (this.user.admin)
      return true;
    else
      return false;
  }

  submitReview() {
    if (this.newReview != undefined) {
      const reviewData = {
        userId: this.user.id,
        reviewBody: this.newReview,
        currentItem: this.itemObject,
        rating: this.selectedRating
      }

      this.authService.createReview(reviewData).subscribe(data => {
        if (data.success)
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        else
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      });
    }
  }

}
