import { Component, OnInit } from '@angular/core';
import { TopicConfigService } from '../topic-config.service';
import { Subscription } from 'rxjs/Subscription';
import { Topic } from '../../../shared/model/topic.model';

@Component({
  selector: 'app-topic-answers',
  templateUrl: './topic-answers.component.html',
  styleUrls: ['./topic-answers.component.scss']
})
export class TopicAnswersComponent implements OnInit {

  topic: Topic;
  private subscription: Subscription;

  constructor(private topicConfigService: TopicConfigService) {
    this.subscription = this.topicConfigService.getTopicAction().subscribe (data => {
      this.topic = this.topicConfigService.currentTopic;
    });
  }

  ngOnInit() {
    this.topic = this.topicConfigService.currentTopic;
  }

}
