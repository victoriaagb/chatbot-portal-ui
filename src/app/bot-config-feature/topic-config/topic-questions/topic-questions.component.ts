import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { BotConfigService } from '../../bot-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Topic } from '../../../shared/model/topic.model';
import * as _ from 'lodash';
import { TopicConfigService, TopicAction } from '../topic-config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-topic-questions',
  templateUrl: './topic-questions.component.html',
  styleUrls: ['./topic-questions.component.scss']
})
export class TopicQuestionsComponent implements OnInit {

  topic: Topic;
  question: String;
  subscription: Subscription;

  constructor(private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) {
      this.subscription = this.topicConfigService.getTopicAction().subscribe (data => {
        this.topic = this.topicConfigService.currentTopic;
      });
    }

  ngOnInit() {
    console.log("topic-questions");
    this.question = '';
    this.topic = this.topicConfigService.currentTopic;
    if (_.isEmpty(this.topic.questions)) {
      this.topic.questions = [];
    }
  }

  addQuestion() {
    if (!_.isEmpty(this.question)) {
      this.topic.questions.push(this.question);
      this.question = '';
    }
  }

  removeQuestion(i: number) {
    this.topic.questions.splice(i, 1);
  }

  editQuestion(i: number, question: string) {
    this.question = question;
    this.removeQuestion(i);
  }

  saveQuestions() {
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE);
    this.router.navigate(['../topic-answers'], {relativeTo: this.route});
  }

}
