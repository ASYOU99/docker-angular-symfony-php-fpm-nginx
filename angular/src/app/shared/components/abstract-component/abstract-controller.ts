import {OnInit} from '@angular/core';
import {PaginateParams, RequestParams} from '../../interfaces';
import {PostsService} from '../../posts.service';

export class AbstractComponentController implements OnInit {

  params: RequestParams;

  page = 1;

  total = 0;

  limit = 10;

  searchStr = '';

  paginateParams: PaginateParams;

  ngOnInit() {

    this.paginateParams = {
      id: 'server',
      itemsPerPage: this.limit,
      currentPage: this.page,
      totalItems: this.total,
    };
  }

  get loadParams() {

    const params = {
      page: this.page,
      limit: this.limit,
    };

    if (this.searchStr) {
      params['searchValue'] = this.searchStr;
    }

    return params;
  }

  clearSearchQuery() {

    this.searchStr = '';

    this.load();
  }

  load() {

    throw new Error('Abstract method \'load\' should be implemented in derived class');
  }
}
