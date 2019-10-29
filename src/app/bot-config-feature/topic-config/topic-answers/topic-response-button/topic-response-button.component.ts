import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Payload } from '../../../../shared/model/topic/payload.model';
import { ButtonType, Button } from '../../../../shared/model/topic/button.model';
import * as _ from 'lodash';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'topic-response-button',
  templateUrl: './topic-response-button.component.html',
  styleUrls: ['./topic-response-button.component.scss']
})
export class TopicResponseButtonComponent implements OnInit {

  ButtonType = ButtonType;

  @ViewChild('buttonsComponent')
  buttonsComponent: ButtonsComponent;
  @Input() payload: Payload;
  @Input() payloadMap: Map<string, string>;
  @Output() createTopicEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.payload)) {
      this.payload = <Payload>{
        text: '',
        buttons: []
      };
    }
  }

  updateButtons() {
    this.payload.buttons = this.buttonsComponent.buttons;
  }

  createTopic(topicName: string) {
    this.createTopicEvent.emit(topicName);
  }
}
