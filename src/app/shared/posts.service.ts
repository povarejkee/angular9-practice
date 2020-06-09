import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IFirebaseDBGet, IFirebaseDBPost, IPost} from './interfaces';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: IPost): Observable<IFirebaseDBPost> {
    return this.http.post<IFirebaseDBPost>(`${environment.firebaseDBUrl}/posts.json`, post)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseDBUrl}/posts/${id}.json`)
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get(`${environment.firebaseDBUrl}/posts.json`)
      .pipe(map((response: IFirebaseDBGet) => {
        const ids = Object.keys(response)

        return ids.map(id => {
            return {
              ...response[id],
              date: new Date(response[id].date),
              id
            }
          })
      }))
  }
}
