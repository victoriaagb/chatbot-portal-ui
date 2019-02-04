import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
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

  topicList: Topic[];
  slideOut: boolean;
  constructor(private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.topicList = this.sharedService.currentBot.value.topics;
    this.slideOut = true;
  }
  toggleSlideOut() {
    this.slideOut = !this.slideOut;
  }
  editQuestion(topic: Topic) {
    this.sharedService.currentTopic = topic;
    this.router.navigate(['./topic-questions'], {relativeTo: this.route});
  }

  editAnswer(topic: Topic) {

  }
}
