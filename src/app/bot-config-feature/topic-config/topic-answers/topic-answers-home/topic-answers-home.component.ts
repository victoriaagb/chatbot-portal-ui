import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Response, TopicResponseType } from '../../../../shared/model/topic/response.model';

@Component({
  selector: 'topic-answers-home',
  templateUrl: './topic-answers-home.component.html',
  styleUrls: ['./topic-answers-home.component.scss']
})
export class TopicAnswersHomeComponent implements OnInit {
  TopicResponseType = TopicResponseType;
  answer: Response;
  @Output() addResponseEvent = new EventEmitter<Response>();
  constructor() { }

  ngOnInit() {
    this.answer = <Response>{};
  }

  setResponseType(responseType: TopicResponseType) {
    this.answer.response_type = responseType;
    this.addResponseEvent.emit(this.answer);
    this.answer = <Response>{};
  }

}
