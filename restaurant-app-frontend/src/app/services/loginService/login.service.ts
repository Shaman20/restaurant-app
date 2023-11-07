import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {

    const apiUrl = 'http://localhost:4000/v1/api/user/login';

    // Send the HTTP POST request and return the Observable
    return this.http.post(apiUrl, formData);
  }
}
