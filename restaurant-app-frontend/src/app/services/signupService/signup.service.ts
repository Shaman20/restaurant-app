import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(formData: any): Observable<any> {

    const apiUrl = 'http://localhost:4000/v1/api/user/signup';

    // Send the HTTP POST request and return the Observable
    return this.http.post(apiUrl, formData);
  }
}
