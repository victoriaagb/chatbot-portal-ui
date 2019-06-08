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

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.payload)) {
      this.payload = <Payload>{
        text: '',
        buttons: []
      };

      this.addButton();
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

  handleChange(index: number) {
    if (this.payload.buttons[index].type === ButtonType.URL) {
      this.payload.buttons[index].url = this.payload.buttons[index].payload;
      this.payload.buttons[index].payload = '';
    } else {
      this.payload.buttons[index].payload = this.payload.buttons[index].url;
      this.payload.buttons[index].url = '';
    }
  }


}
