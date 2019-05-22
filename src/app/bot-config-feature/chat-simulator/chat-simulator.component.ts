import { Component, OnInit, Input} from '@angular/core';
import { Topic } from '../../shared/model/topic.model';
import { Response } from '../../shared/model/topic/response.model';
import * as _ from 'lodash';
import { Payload } from '../../shared/model/topic/payload.model';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'chat-simulator',
  templateUrl: './chat-simulator.component.html',
  styleUrls: ['./chat-simulator.component.scss']
})
export class ChatSimulatorComponent implements OnInit, OnChanges {

  @Input() topicList: Topic[];
  conversationList = [];

  constructor() { }

  ngOnInit() {
    this.updateTopicList();
  }

  ngOnChanges() {
   this.updateTopicList();
  }

  updateTopicList() {
    this.conversationList = [];
    let chatSetUser: [String, String];
    let chatSetBot: [Payload, String];
    this.topicList.forEach(topic => {
      const response: Response = _.get(topic, 'answers[0]', {});
      const userQuestion = (_.isArray(topic.questions) && topic.questions.length) ? topic.questions[topic.questions.length - 1] : '...';
      const responseType = this.getResponseType(response);
      const payload = response.payload;
      chatSetUser = [userQuestion, 'user'];
      chatSetBot = [payload, responseType];
      this.conversationList.push(chatSetUser);
      this.conversationList.push(chatSetBot);
    });
  }

  getResponseType(response: Response) {
    return 'text';
  }
}
