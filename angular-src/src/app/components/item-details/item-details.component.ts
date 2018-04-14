import { Component, OnInit, Input } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  @Input('itemId') item: any;
  newReview;
  itemObject;
  allReviews = [];
  private sub: any;
  user = JSON.parse(localStorage.getItem('user'));
  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const item = {
        id: params['itemId']
      }
      this.authService.getItemById(item).subscribe(data => {
        if (data.success) {
          this.itemObject = data.itemObject;
          this.getAllReviews();
        }
        else
          this.flashMessage.show(data.msg, { cssClass: 'alert-false', timeout: 3000 });
      })

    });


  }

  getAllReviews() {
    const item = {
      id: this.itemObject._id
    }
    this.authService.getAllReviewsForItem(item).subscribe(data => {
      if (data.success) {
        this.allReviews = data.allReadableReviewObjects;
        this.flashMessage.show(data.msg, { cssClass: 'alert-true', timeout: 3000 });
      }
      else
        this.flashMessage.show(data.msg, { cssClass: 'alert-false', timeout: 3000 });

    });

  }

  submitReview() {
    if (this.newReview != undefined) {
      const reviewData = {
        userId: this.user.id,
        reviewBody: this.newReview,
        currentItem: this.itemObject
      }

      this.authService.createReview(reviewData).subscribe(data => {
        if (data.success)
          this.flashMessage.show(data.msg, { cssClass: 'alert-true', timeout: 3000 });
        else
          this.flashMessage.show(data.msg, { cssClass: 'alert-false', timeout: 3000 });
      });
    }
  }

}
