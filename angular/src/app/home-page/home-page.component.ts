import {Component, OnInit} from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Observable} from 'rxjs';
import {PaginationCollection, Post} from '../shared/interfaces';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  // posts$: Observable<PaginationCollection>;
  posts: Post[];
  constructor(private postsService: PostsService) {
  }

  ngOnInit() {

    this.postsService.postsPaginate().subscribe(pagination => {
      console.log(pagination);
      this.posts = pagination.results;

      console.log(this.posts);
    });
  }

}
