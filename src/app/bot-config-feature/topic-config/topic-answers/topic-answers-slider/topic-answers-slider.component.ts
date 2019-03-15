import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  Response,
  TopicResponseType
} from '../../../../shared/model/topic/response.model';

@Component({
  selector: 'topic-answers-slider',
  templateUrl: './topic-answers-slider.component.html',
  styleUrls: ['./topic-answers-slider.component.scss']
})
export class TopicAnswersSliderComponent implements OnInit {
  TopicResponseType = TopicResponseType;
  @Input() answerList: Response[];
  @Output() selectResponseEvent = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  selectResponse(answerIndex: number) {
    this.selectResponseEvent.emit(answerIndex);
  }

  isArrowNeeded(answerIndex: number) {
    let isArrowNeeded = true;
    if (this.answerList) {
      const length = this.answerList.length;
      if (answerIndex === length - 1) {
        isArrowNeeded = false;
      }
    }
    return isArrowNeeded;
  }
}
