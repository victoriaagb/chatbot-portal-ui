import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '../../../../shared/model/topic/response.model';
import * as _ from 'lodash';
import { Payload } from '../../../../shared/model/topic/payload.model';
@Component({
  selector: 'topic-response-text',
  templateUrl: './topic-response-text.component.html',
  styleUrls: ['./topic-response-text.component.scss']
})
export class TopicResponseTextComponent implements OnInit {

  @Input() payload: Payload;
  @Output() saveResponseEvent = new EventEmitter<Payload>();
  @Output() deleteResponseEvent = new EventEmitter<Payload>();
  @Output() cancelEvent = new EventEmitter();

  isNewResponse: Boolean = true;

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.payload)) {
      this.payload = <Payload>{
        text: ''
      };
    } else {
      this.isNewResponse = false;
    }
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
