import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private apiKey = '581d0c03';
  private apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  searchMovies(title: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}&s=${title}`);

  }

  getMovieDetails(imdbID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}&i=${imdbID}`);
  }
}
