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
  topicList: Topic[];

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
        this.updateTopicPayloadMap();
        this.topicList = _.clone(this.topicList);
      });
    }

  ngOnInit() {
    this.botConfig = this.sharedService.currentBot;
    if (_.isEmpty(this.botConfig.value.topics)) {
      this.botConfig.value.topics = [];
    }
    this.topicList = this.botConfig.value.topics;
    this.updateTopicPayloadMap();
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
    this.sharedService.sendBotAction(BotAction.UPDATE, this.botConfig);
    this.currentTopic = undefined;
    this.router.navigate(['./topic-name'], {relativeTo: this.route});
  }

  updateTopicList() {
    const topicMap: Map<String, String> = new Map();
    for (let i = 0; i < _.get(this.botConfig, 'value.topics.length', 0); i++) {
      if (this.botConfig.value.topics[i].name === this.currentTopic.name) {
        this.botConfig.value.topics[i] = this.currentTopic;
        this.topicList[i] = this.currentTopic;
        this.sharedService.sendBotAction(BotAction.UPDATE, this.botConfig);
        return;
      }
      const value: String = _.get(this.topicList[i], 'questions', []).length === 0 ? '' : this.topicList[i].questions[0];
      topicMap.set(this.topicList[i].name, value);
    }
    this.topicConfigService.storeSessionData('topicMap', topicMap);
  }

  updateTopicPayloadMap() {
    const topicMap: Map<string, string> = new Map();
    this.topicList.forEach(function (topic: Topic) {
      const value: string = _.get(topic, 'questions.length', 0) === 0 ? '' : topic.questions[0];
      topicMap.set(topic.name, value);
    });
    this.topicConfigService.topicMap = topicMap;
  }

  addNewTopic(topic: Topic) {
    this.topicConfigService.currentTopic = this.currentTopic = topic;
    this.botConfig.value.topics.push(this.currentTopic);
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE, this.currentTopic);
  }
}
