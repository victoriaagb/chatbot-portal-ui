import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../../shared/model/topic.model';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'topic-slider',
  templateUrl: './topic-slider.component.html',
  styleUrls: ['./topic-slider.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class TopicSliderComponent implements OnInit {

  @Input() topicList: Topic[];
  @Output() gotoAnswerEvent = new EventEmitter<Topic>();
  @Output() gotoQuestionEvent = new EventEmitter<Topic>();
  slideOut: boolean;
  constructor() {}

  ngOnInit() {
    this.slideOut = true;
  }

  toggleSlideOut() {
    this.slideOut = !this.slideOut;
  }
  editQuestion(topic: Topic) {
    this.gotoQuestionEvent.emit(topic);
  }

  editAnswer(topic: Topic) {
    this.gotoAnswerEvent.emit(topic);
  }
}
