import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Topic } from '../../../shared/model/topic.model';
import { TopicConfigService, TopicAction } from '../topic-config.service';

@Component({
  selector: 'topic-name',
  templateUrl: './topic-name.component.html',
  styleUrls: ['./topic-name.component.scss']
})
export class TopicNameComponent implements OnInit {

  topicName: string;

  constructor(
    private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) {

    }

  ngOnInit() {
    this.topicName = '';
    this.topicConfigService.removeSessionData();
  }

  createNewTopic() {
    if (!_.isEmpty(this.topicName)) {
      let topicId = this.topicConfigService.createUniqueTopicId(this.topicName);
      const topic: Topic = {
        topicId: topicId,
        name: this.topicName
      };
      this.topicConfigService.sendTopicAction(TopicAction.CREATE, topic);
      this.router.navigate(['../topic-questions'], {relativeTo: this.route});
   }
  }
}
