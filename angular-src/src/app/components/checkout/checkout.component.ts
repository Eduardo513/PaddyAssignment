import { Component, OnInit, Input } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Input('finalPrice') finalPrice: any;
  paymentMethod = [
    'Card',
    'something',]
  selectedAccessibility
  accessibilityOptions = [
    'Card',
    'PayPal',]
  hide = true;
  private sub: any;
  totalPrice;
  user

  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  this.user = JSON.parse(localStorage.getItem('user'));
    this.sub = this.route.params.subscribe(params => {
      this.finalPrice = params['finalPrice'];
     
    });
  }

  


}
