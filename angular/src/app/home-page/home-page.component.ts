import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Subscription} from 'rxjs';

import {Post} from '../shared/interfaces';
import {AbstractComponentController} from '../shared/components/abstract-component/abstract-controller';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})

export class HomePageComponent extends AbstractComponentController implements OnInit, OnDestroy {

  posts: Post[];

  pSub: Subscription;

  fSub: Subscription;

  constructor(private postsService: PostsService) {
    super();
  }

  ngOnInit() {

    super.ngOnInit();

    this.params = {};

    this.changePage();
  }

  changePage(setPage: number = 1) {

    this.page = setPage;

    this.pSub = this.load();
  }

  ngOnDestroy() {

    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.fSub) {
      this.pSub.unsubscribe();
    }
  }

  load(methodName = 'posts') {

    return this.getPosts(methodName);
  }

  find() {

    this.fSub = this.load('postsSearch');
  }

  getPosts(methodName) {

    return this.postsService[methodName](this.loadParams).subscribe(pagination => {

      this.posts = pagination.results;

      this.paginateParams.currentPage = this.page;

      this.paginateParams.itemsPerPage = this.limit;

      this.paginateParams.totalItems = pagination.numResults;

    });
  }

  newLimit() {

    this.page = 1;

    this.searchStr.length > 0 ? this.find() : this.load();

  }
}
