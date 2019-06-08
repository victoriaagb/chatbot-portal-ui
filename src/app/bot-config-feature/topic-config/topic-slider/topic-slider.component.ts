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
  @Output() gotoAnswerEvent = new EventEmitter<Topic>();
  @Output() gotoQuestionEvent = new EventEmitter<Topic>();
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

  editQuestions(topic: Topic) {
    this.gotoQuestionEvent.emit(topic);
  }

  editAnswers(topic: Topic) {
    this.gotoAnswerEvent.emit(topic);
  }

  removeTopic(i: number) {
    this.removeTopicEvent.emit(i);
  }

  createTopic() {
    this.createTopicEvent.emit();
  }
}
