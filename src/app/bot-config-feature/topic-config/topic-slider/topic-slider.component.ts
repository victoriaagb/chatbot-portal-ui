import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../../shared/model/topic.model';
import { Router, ActivatedRoute } from '@angular/router';
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
  @Output() currentTopicEvent = new EventEmitter<Topic>();
  slideOut: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.slideOut = true;
  }

  toggleSlideOut() {
    this.slideOut = !this.slideOut;
  }
  editQuestion(topic: Topic) {
    this.currentTopicEvent.emit(topic);
    this.router.navigate(['./topic-questions'], {relativeTo: this.route});
  }

  editAnswer(topic: Topic) {
    this.currentTopicEvent.emit(topic);
    this.router.navigate(['./topic-answers'], {relativeTo: this.route});
  }
}
