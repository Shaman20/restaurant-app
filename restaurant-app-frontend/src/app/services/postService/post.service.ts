import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private httpClient: HttpClient) { }

  saveContent(content: string): Observable<any> {

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = 'http://localhost:4000/v1/api/post/feed'
    return this.httpClient.post(apiUrl, { content } , { headers })
  }

  getPosts(): Observable<any> {

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    const apiUrl = 'http://localhost:4000/v1/api/post/feed'

    return this.httpClient.get(apiUrl, { headers })
  }

  likePost(postId: any): Observable<any> {

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    const apiUrl = `http://localhost:4000/v1/api/post/likes:${postId}`

    return this.httpClient.post(apiUrl, null, { headers })
  }

  unlikePost(postId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Construct the API URL for unliking a post
    const apiUrl = `http://localhost:4000/v1/api/post/likes:${postId}`;
    // Use the HTTP DELETE method to unlike the post
    return this.httpClient.delete(apiUrl, { headers });
  }

}
