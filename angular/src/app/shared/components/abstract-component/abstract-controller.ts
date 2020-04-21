import {OnInit} from '@angular/core';
import {PaginateParams, RequestParams} from '../../interfaces';

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
      optionsPerPage: [10, 25, 50, 100],
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


  reset() {

    this.page = 1;

    this.limit = this.paginateParams.optionsPerPage[0];

    this.clearSearchQuery();
  }

  load() {

    throw new Error('Abstract method \'load\' should be implemented in derived class');
  }
}
