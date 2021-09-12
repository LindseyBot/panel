export class Page<T> {

  page!: number;
  limit!: number;
  last!: boolean;
  items!: T[];
  total!: number;
  totalPages!: number;

  constructor(page: number) {
    this.page = page;
  }

}
