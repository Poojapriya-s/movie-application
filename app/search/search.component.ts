import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, switchMap, debounceTime } from 'rxjs';
import { OmdbService } from '../omdb.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-search',
  standalone: true,
  providers: [OmdbService],
  imports: [ReactiveFormsModule,FormsModule,MatFormFieldModule,MatInputModule,HttpClientModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchControl = new FormControl();
  results: any;
  @ViewChild('iframe', {static: true}) iframe: ElementRef | undefined;

  constructor(private omdbService: OmdbService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(title => this.omdbService.searchMovies(title))
    ).subscribe(res => {
      this.results = res;
      if (this.results && this.results.Search) {
        const firstResult = this.results.Search[0];
        this.omdbService.getMovieDetails(firstResult.imdbID).subscribe(movie => {
          if (this.iframe) {
            this.iframe.nativeElement.contentWindow.postMessage({movie}, 'http://localhost:4201'); 
          }
        });
      }
    });
  }

}
