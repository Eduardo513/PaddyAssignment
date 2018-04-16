import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http ) { }

  registerUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  createItem(newItem)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/items/createItem', newItem, {headers: headers})
      .map(res => res.json());
  }

  createReview(reviewData)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/items/createReview', reviewData, {headers: headers})
      .map(res => res.json());
  }

  getItemById(item)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/items/getItemById', item, {headers: headers})
      .map(res => res.json());
  }

  removeItemFromCart(item)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/removeItemFromCart', item, {headers: headers})
      .map(res => res.json());
  }


  getAllUsers()
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/getAllUsers', {headers: headers})
      .map(res => res.json());
  }


  getAllUsersHistories(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/getAllUsersHistories', user, {headers: headers})
      .map(res => res.json());
  }

  getAllReviewsForItem(item)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/items/getAllReviewsForItem', item, {headers: headers})
      .map(res => res.json());
  }

  getAllItems()
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/items/getAllItems', {headers: headers})
      .map(res => res.json());
  }

  editItem(item)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/items/editItem', item, {headers: headers})
      .map(res => res.json());
  }
  confirmPurchase(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/confirmPurchase', user, {headers: headers})
      .map(res => res.json());
  }

  getAllItemsInCartForUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/getAllItemsInCartForUser', user, {headers: headers})
      .map(res => res.json());
  }


  addItemToCart(itemObject)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/items/addItemToCart', itemObject, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile()
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user)
  {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn()
  {
    return tokenNotExpired("id_token");
  }

  admin()
  {
 
   const user = JSON.parse(localStorage.getItem('user'));
   if(user== undefined)
   return false
   
    if(user.admin)
    return true;
    else
    return false
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  

}
