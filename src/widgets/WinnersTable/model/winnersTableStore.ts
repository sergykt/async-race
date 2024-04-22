import { WinnersSortBy } from '@/entities/winner';
import { OrderDirection } from '@/shared/const/OrderDirection';
import { makeAutoObservable } from 'mobx';

export class WinnersTableStore {
  page = 1;

  limit = 7;

  sort = WinnersSortBy.TIME;

  order = OrderDirection.ASC;

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page: number) => {
    this.page = page;
  };

  setLimit = (limit: number) => {
    this.limit = limit;
  };

  toggleOrder = () => {
    this.order = this.order === OrderDirection.ASC ? OrderDirection.DESC : OrderDirection.ASC;
  };

  setSortBy = (newSort: WinnersSortBy) => {
    if (newSort === this.sort) {
      this.toggleOrder();
    } else {
      this.sort = newSort;
      this.order = OrderDirection.ASC;
    }
  };
}
