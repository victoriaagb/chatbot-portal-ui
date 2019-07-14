import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  private currentPage: number;

  @Input()
  private itemsLength: number;

  @Output()
  gotoPageEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    this.currentPage = 0;
  }

  gotoPage(index: number) {
    this.currentPage = index;
    this.gotoPageEvent.emit(index);
  }

  public counter(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

}
