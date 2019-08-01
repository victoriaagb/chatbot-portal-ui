import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  public currentPage: number;

  @Input()
  public itemsLength: number;

  @Output()
  gotoPageEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  gotoPage(index: number) {
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
