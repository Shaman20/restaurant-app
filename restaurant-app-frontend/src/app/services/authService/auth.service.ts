import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Initialize isLoggedIn from local storage on service instantiation
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  setLoggedInState(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
    
    // Store the state in local storage
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }
}
