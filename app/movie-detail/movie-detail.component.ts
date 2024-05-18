import { NgIf } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const eventListener = this.renderer.listen('window', 'message', (event: MessageEvent) => {
      if (event.origin === 'http://localhost:4200') {
        this.movie = event.data.movie;
      }
    });
  }
}
