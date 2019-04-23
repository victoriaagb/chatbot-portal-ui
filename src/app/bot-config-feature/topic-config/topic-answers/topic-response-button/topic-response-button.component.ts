import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Payload } from '../../../../shared/model/topic/payload.model';
import { ButtonType, Button } from '../../../../shared/model/topic/button.model';
import * as _ from 'lodash';

@Component({
  selector: 'topic-response-button',
  templateUrl: './topic-response-button.component.html',
  styleUrls: ['./topic-response-button.component.scss']
})
export class TopicResponseButtonComponent implements OnInit {

  ButtonType = ButtonType;

  @Input() payload: Payload;
  @Output() saveResponseEvent = new EventEmitter<Payload>();
  @Output() deleteResponseEvent = new EventEmitter<Payload>();
  @Output() cancelEvent = new EventEmitter();

  isNewResponse: Boolean = true;

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.payload)) {
      this.payload = <Payload>{
        text: '',
        buttons: []
      };

      this.addButton();
    } else {
      this.isNewResponse = false;
    }
  }

  addButton() {
    let newButton: Button;
    newButton = {
      title: '',
      type: ButtonType.URL,
      url: '',
      payload: ''
    };

    this.payload.buttons.push(newButton);
    console.log(this.payload);
  }

  removeButton(index: number) {
    this.payload.buttons.splice(index, 1);
  }

  saveResponse() {
    this.saveResponseEvent.emit(this.payload);
  }

  deleteResponse() {
    this.deleteResponseEvent.emit(this.payload);
  }

  cancel() {
    this.cancelEvent.emit();
  }

}
