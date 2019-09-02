import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Topic } from '../../../shared/model/topic.model';
import { TopicConfigService, TopicAction } from '../topic-config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'topic-name',
  templateUrl: './topic-name.component.html',
  styleUrls: ['./topic-name.component.scss']
})
export class TopicNameComponent implements OnInit, OnDestroy {

  topicName: string;
  newTopic: boolean;
  subscription: Subscription;

  constructor(
    private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) {
      this.subscription = this.topicConfigService.getTopicAction().subscribe (data => {
        this.initializeInvites();
      });
    }

  ngOnInit() {
    this.initializeInvites();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initializeInvites() {
    if (this.topicConfigService.currentTopic) {
      this.topicName = this.topicConfigService.currentTopic.name;
      this.newTopic = false;
    } else {
      this.topicName = '';
      this.newTopic = true;
    }
  }

  createNewTopic() {
    if (!_.isEmpty(this.topicName)) {
      const topicId = this.topicConfigService.createUniqueTopicId(this.topicName);
      const topic: Topic = {
        topicId: topicId,
        name: this.topicName
      };
      this.topicConfigService.sendTopicAction(TopicAction.CREATE, topic);
      this.router.navigate(['../topic-questions'], {relativeTo: this.route});
   }
  }

  updateTopicName() {
    if (!_.isEmpty(this.topicName)) {
      this.topicConfigService.currentTopic.name = this.topicName;
      this.topicConfigService.sendTopicAction(TopicAction.UPDATE,  this.topicConfigService.currentTopic);
      this.router.navigate(['../topic-questions'], {relativeTo: this.route});
   }
  }
}
