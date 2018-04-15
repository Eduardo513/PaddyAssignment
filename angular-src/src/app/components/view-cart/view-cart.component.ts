import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  allItemsInUsersCart = [];

  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllItemsInCart();
  }

  checkout(){
    var finalPrice = this.calculateCartPrice();
    this.router.navigate(['/checkout', { finalPrice: finalPrice }]);

  }


  calculateCartPrice(){
    var totalPrice = 0;
    for(var i = 0; i < this.allItemsInUsersCart.length; i++)
    {
      totalPrice = totalPrice + this.calculateSingleItemPrice(this.allItemsInUsersCart[i])
      if(i == this.allItemsInUsersCart.length-1){
        Math.round(totalPrice);
          return totalPrice
        }
      }
  }

  calculateSingleItemPrice(item){
    var normalPrice = item.price;
    var discount = item.discount;
    var discountedValue = (discount/100) * normalPrice;
    var finalPrice = normalPrice - discountedValue;
    return finalPrice;
  }

  getAllItemsInCart() {
    const userData = {
      id: this.user.id
    }
    this.authService.getAllItemsInCartForUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.allItemsInUsersCart = data.allCartItemObjects;
      }
      else
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
    })
  }

  viewItem(item){
    this.router.navigate(['/item-details', { itemId: item._id }]);
  }

}
