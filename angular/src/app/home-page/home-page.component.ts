import {Component, OnInit, OnDestroy} from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Observable, Subscription} from 'rxjs';
import {PaginateParams, PaginationCollection, Post} from '../shared/interfaces';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  page = 1;

  total = 0;

  posts: Post[];

  paginateParams: PaginateParams;

  pSub: Subscription;

  fSub: Subscription;

  searchStr: string;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {

    this.paginateParams = {
      id: 'server',
      itemsPerPage: 10,
      currentPage: this.page,
      totalItems: this.total,
    };

    this.getPage(this.page);
  }

  getPage(setPage: number) {

    this.pSub = this.postsService.postsPaginate(setPage).subscribe(pagination => {
      console.log(pagination);

      this.posts = pagination.results;

      this.paginateParams.currentPage = setPage;

      this.paginateParams.totalItems = pagination.numResults;
    });
  }

  ngOnDestroy() {

    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.fSub) {
      this.pSub.unsubscribe();
    }
  }

  find(setPage: number) {

    this.fSub = this.postsService.findPosts(this.searchStr, setPage).subscribe(pagination => {

      this.posts = pagination.results;

      this.paginateParams.currentPage = setPage;

      this.paginateParams.totalItems = pagination.numResults;
    });
  }
}
