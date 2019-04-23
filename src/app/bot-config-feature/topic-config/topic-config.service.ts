import { Injectable, Inject } from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Topic } from '../../shared/model/topic.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TopicConfigService {

  private _topicSubject = new Subject<any>();
  currentTopic: Topic;
  constructor(@Inject(SESSION_STORAGE) private sessionData: WebStorageService) { }

  // Session Data Manipulation
  storeSessionData(key: string, val: any) {
    this.sessionData.set(key, val);
  }

  retrieveSessionData() {
    this.currentTopic = this.sessionData.get('currentTopic');
  }

  removeSessionData() {
    this.sessionData.remove('currentTopic');
  }

  // Message Events for Current topic
  sendTopicAction(topicAction: TopicAction, topic: Topic) {
    this.currentTopic = topic;
    this.storeSessionData('currentTopic', this.currentTopic);
    this._topicSubject.next({ action: topicAction });
  }

  clearMessage() {
    this._topicSubject.next();
  }

  getTopicAction(): Observable<any> {
    return this._topicSubject.asObservable();
  }
}

export enum TopicAction {CREATE, UPDATE, REMOVE, NONE}


