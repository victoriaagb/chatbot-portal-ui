import { Injectable, Inject } from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Topic } from '../../shared/model/topic.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class TopicConfigService {

  private _topicSubject = new Subject<any>();
  topicList: Topic[] = [];
  currentTopic: Topic;

  constructor(@Inject(SESSION_STORAGE) private sessionData: WebStorageService) { }

  // Session Data Manipulation
  storeSessionData(key: string, val: any) {
    this.sessionData.set(key, val);
  }

  retrieveSessionData() {
    this.currentTopic = this.sessionData.get('currentTopic');
    this.topicList = this.sessionData.get('topicList');
    if (this.topicList == null) {
      this.topicList = [];
    }
  }

  removeSessionData() {
    this.sessionData.remove('currentTopic');
    this.sessionData.remove('topicList');
  }

  // Message Events for Current topic
  sendTopicAction(topicAction: TopicAction, topic: Topic) {
    this.currentTopic = topic;
    this.storeSessionData('currentTopic', this.currentTopic);
    this.storeSessionData('topicList', this.topicList);
    this._topicSubject.next({ action: topicAction });
  }

  clearMessage() {
    this._topicSubject.next();
  }

  getTopicAction(): Observable<any> {
    return this._topicSubject.asObservable();
  }

  createUniqueTopicId(topicName: String) {
    const existingTopic = this.topicList.find(topic => topic.name === topicName );
    if (existingTopic === undefined) {
      return topicName;
    } else {
      return this.createUniqueTopicId(topicName + '_1');
    }
  }

}

export enum TopicAction {CREATE, UPDATE, REMOVE, NONE}


