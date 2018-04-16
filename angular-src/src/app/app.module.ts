
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { AppMaterialModules } from './material.module';
//import { AppMaterialModules } from './material.module'; //imports all of materials from the materials module





import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';


import {ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UsersHistoryComponent } from './components/users-history/users-history.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { SearchAuthorPipe } from './search-author.pipe';
import { SearchCategoryPipe } from './search-category.pipe';



const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'view-users', component: ViewUsersComponent, canActivate:[AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard]},
  {path: 'view-cart', component: ViewCartComponent, canActivate:[AuthGuard]},
  {path: 'item-details', component: ItemDetailsComponent, canActivate:[AuthGuard]},
  {path: 'view-items', component: ViewItemsComponent, canActivate:[AuthGuard]},
  {path: 'create-item', component: CreateItemComponent, canActivate:[AuthGuard]},
  {path: 'users-history', component: UsersHistoryComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateItemComponent,
    ViewItemsComponent,
    ItemDetailsComponent,
    ViewCartComponent,
    CheckoutComponent,
    ViewUsersComponent,
    UsersHistoryComponent,
    SearchPipePipe,
    SearchAuthorPipe,
    SearchCategoryPipe,


   // AppMaterialModules
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    BrowserAnimationsModule,
    MatInputModule,
    AppMaterialModules,
   

   
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
