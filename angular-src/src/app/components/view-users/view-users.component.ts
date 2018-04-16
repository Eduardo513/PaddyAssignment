import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  allUsers = [];

  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(data => {
      if (data.success){
        this.allUsers = data.allUsers;
      }
        
      else
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });

    });

  }

  viewPurchasingHistory(){
    
  }

}
