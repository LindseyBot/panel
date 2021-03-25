export class Page<T> {

  page: number;
  limit: number;
  last: boolean;
  items: T[];

  constructor(page: number) {
    this.page = page;
  }

}
