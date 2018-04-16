
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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

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


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'view-users', component: ViewUsersComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'view-cart', component: ViewCartComponent },
  {path: 'item-details', component: ItemDetailsComponent},
  {path: 'view-items', component: ViewItemsComponent},
  {path: 'create-item', component: CreateItemComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CreateItemComponent,
    ViewItemsComponent,
    ItemDetailsComponent,
    ViewCartComponent,
    CheckoutComponent,
    ViewUsersComponent,

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
