import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../../shared/model/topic.model';
import { trigger, transition, animate, style } from '@angular/animations';

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
  @Output() gotoAnswerEvent = new EventEmitter<number>();
  @Output() gotoQuestionEvent = new EventEmitter<number>();
  @Output() removeTopicEvent = new EventEmitter<number>();
  @Output() createTopicEvent = new EventEmitter();
  slideOut: boolean;
  constructor() {}

  ngOnInit() {
    this.slideOut = true;
  }

  toggleSlideOut() {
    this.slideOut = !this.slideOut;
  }

  editQuestions(i: number) {
    this.gotoQuestionEvent.emit(i);
  }

  editAnswers(i: number) {
    this.gotoAnswerEvent.emit(i);
  }

  removeTopic(i: number) {
    this.removeTopicEvent.emit(i);
  }

  createTopic() {
    this.createTopicEvent.emit();
  }
}
