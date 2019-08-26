import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedService, BotAction } from '../../shared/shared.service';
import { BotConfigService } from '../bot-config.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { Topic } from '../../shared/model/topic.model';
import { TopicConfigService, TopicAction } from './topic-config.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-topic-config',
  templateUrl: './topic-config.component.html',
  styleUrls: ['./topic-config.component.scss']
})
export class TopicConfigComponent implements OnInit, OnDestroy {

  botConfig: BotConfigRepository;
  currentTopic: Topic;
  botSubscription: Subscription;
  topicSubscription: Subscription;
  navigationSubscription: Subscription;

  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.topicConfigService.retrieveSessionData();
        }
      });
      this.botSubscription = this.sharedService.getBotAction().subscribe( data => {
        this.botConfig = this.sharedService.currentBot;
      });
      this.topicSubscription = this.topicConfigService.getTopicAction().subscribe (data => {
        this.currentTopic = this.topicConfigService.currentTopic;
        if (data.action === TopicAction.CREATE) {
          this.addNewTopic(this.currentTopic);
          this.updateTopicList();
        } else if (data.action === TopicAction.UPDATE || data.action === TopicAction.REMOVE) {
          this.updateTopicList();
        }
       this.botConfig.value.topics = _.clone(this.botConfig.value.topics);
      });
    }

  ngOnInit() {
    this.botConfig = this.sharedService.currentBot;
    if (_.isEmpty(this.botConfig.value.topics)) {
      this.botConfig.value.topics = [];
    }
    this.topicConfigService.topicList = this.botConfig.value.topics;
  }

  ngOnDestroy() {
    this.botSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
    this.navigationSubscription.unsubscribe();
  }

  gotoTopicQuestion($event: Topic) {
    this.currentTopic = $event;
    this.topicConfigService.sendTopicAction(TopicAction.NONE, this.currentTopic);
    this.router.navigate(['./topic-questions'], {relativeTo: this.route});
  }

  gotoTopicAnswer($event: Topic) {
    this.currentTopic = $event;
    this.topicConfigService.sendTopicAction(TopicAction.NONE, this.currentTopic);
    this.router.navigate(['./topic-answers'], {relativeTo: this.route});
  }

  gotoTopicName() {
    this.currentTopic = undefined;
    this.router.navigate(['./topic-name'], {relativeTo: this.route});
  }

  removeTopic(i: number) {
    this.botConfig.value.topics.splice(i, 1);
    this.topicConfigService.topicList =  this.botConfig.value.topics;
    this.currentTopic = undefined;
    this.sharedService.sendBotAction(BotAction.UPDATE, this.botConfig);
    this.topicConfigService.storeSessionData('topicList', this.botConfig.value.topics);
    this.router.navigate(['./topic-name'], {relativeTo: this.route});
  }

  updateTopicList() {
    for (let i = 0; i < _.get(this.botConfig, 'value.topics.length', 0); i++) {
      if (this.botConfig.value.topics[i].name === this.currentTopic.name) {
        this.botConfig.value.topics[i] = this.currentTopic;
        this.sharedService.sendBotAction(BotAction.UPDATE, this.botConfig);
        return;
      }
      const value: String = _.get(this.botConfig.value.topics[i], 'questions', []).length === 0
      ? '' : this.botConfig.value.topics[i].questions[0];
    }
    this.topicConfigService.topicList = this.botConfig.value.topics;
    this.topicConfigService.storeSessionData('topicList', this.botConfig.value.topics);
  }

  addNewTopic(topic: Topic) {
    topic.topicId = this.topicConfigService.createUniqueTopicId(topic.name);
    this.topicConfigService.currentTopic = this.currentTopic = topic;
    this.botConfig.value.topics.push(this.currentTopic);
    this.topicConfigService.topicList = this.botConfig.value.topics;
    this.topicConfigService.sendTopicAction(TopicAction.NONE, this.currentTopic);
  }
}
