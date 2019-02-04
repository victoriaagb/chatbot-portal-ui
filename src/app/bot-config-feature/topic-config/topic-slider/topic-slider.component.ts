import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Topic } from '../../../shared/model/topic.model';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

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
export class TopicSliderComponent implements OnInit, OnDestroy {

  topicList: Topic[];
  slideOut: boolean;
  private subscription: Subscription;
  constructor(private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute) {
      this.subscription = this.sharedService.getCurrentBot().subscribe( data => {
        this.topicList = data.botconfig.value.topics;
      });
    }

  ngOnInit() {
    this.topicList = this.sharedService.currentBot.value.topics;
    this.slideOut = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleSlideOut() {
    this.slideOut = !this.slideOut;
  }
  editQuestion(topic: Topic) {
    this.sharedService.currentTopic = topic;
    this.sharedService.storeSessionData('currentTopic', topic);
    this.router.navigate(['./topic-questions'], {relativeTo: this.route});
  }

  editAnswer(topic: Topic) {

  }
}
