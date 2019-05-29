import { Injectable } from '@angular/core';
import { BotConfigRepository } from '../shared/model/bot-config-repository.model';
import * as _ from 'lodash';

@Injectable()
export class BotConfigRulesService {

  constructor() { }

  canBuild(botConfig: BotConfigRepository) {
    let isBuildable = true;
    if (!botConfig) {
      return false;
    }
    let name = botConfig.value.name.botName;
    let topics = botConfig.value.topics;

    if (_.isUndefined(name) ||
        _.isEmpty(name)) {
          isBuildable = false;
    }

    if (_.isUndefined(topics) ||
        _.isEmpty(topics)) {
          isBuildable = false;
    } else {
      topics.forEach(function (topic) {

        if (_.isUndefined(topic.questions) ||
          _.isEmpty(topic.questions)) {
          isBuildable = false;
        }

        if (_.isUndefined(topic.answers) ||
          _.isEmpty(topic.answers)) {
          isBuildable = false;
        }
      });
    }
    return isBuildable;
  }


}
