import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friendStatus: { [userId: number]: boolean } = {};

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    const apiUrl = 'http://localhost:4000/v1/api/user/get-users'

    return this.httpClient.get(apiUrl, { headers })
  }

  addFriend(friendId: number): Observable<any> {

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = 'http://localhost:4000/v1/api/friend/add-friend'
    return this.httpClient.post(apiUrl, { friendId } , { headers })
  }

  getFriends(): Observable<any> {

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    const apiUrl = 'http://localhost:4000/v1/api/friend/get-friend'
    return this.httpClient.get(apiUrl, { headers })
  }

  setFriendStatus(userId: number, isFriend: boolean) {
    this.friendStatus[userId] = isFriend;
  }

  getFriendStatus(userId: number): boolean {
    return this.friendStatus[userId] || false;
  }
}
