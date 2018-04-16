import { Component, OnInit, Input } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-history',
  templateUrl: './users-history.component.html',
  styleUrls: ['./users-history.component.css']
})
export class UsersHistoryComponent implements OnInit {
  @Input('userId') user: any;
  private sub: any;
  allUserHistories = []
  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const user = {
        id: params['userId']
      }
    
      this.authService.getAllUsersHistories(user).subscribe(data =>{
        if (data.success){
          this.allUserHistories = data.allPuchaseHistoryObjects;
          console.log(this.allUserHistories);
        }
          
        else
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
  
   
      });

    });
  }

}
