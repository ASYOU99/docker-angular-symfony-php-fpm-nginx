import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, PaginationCollection, Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.apiUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.publishedAt),
        };
      }));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/posts/${id}.json`);
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.apiUrl}/posts/${post.id}.json`, post);
  }

  postsPaginate(page: number, limit: number = 10): Observable<PaginationCollection> {

    return this.http.post<PaginationCollection>(`${environment.apiUrl}/blog/`, {page})
      .pipe(map((response: PaginationCollection) => {
        return {
          ...response
        };
      }));
  }

  getBySlug(slug: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/blog/posts/${slug}`)
      .pipe(map((post: Post) => {
        return {
          ...post, slug,
          date: new Date(post.publishedAt),
        };
      }));
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          }));
      }));
  }

  findPosts(queryString: string, page: number, limit: number = 10): Observable<PaginationCollection> {
    return this.http.post<PaginationCollection>(`${environment.apiUrl}/blog/`, {queryString})
      .pipe(map((response: PaginationCollection) => {
        return {
          ...response
        };
      }));
  }
}
