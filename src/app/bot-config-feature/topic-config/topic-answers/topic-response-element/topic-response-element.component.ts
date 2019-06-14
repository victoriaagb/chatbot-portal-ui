import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Payload } from '../../../../shared/model/topic/payload.model';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Element } from '../../../../shared/model/topic/element.model';
import * as _ from 'lodash';

@Component({
  selector: 'topic-response-element',
  templateUrl: './topic-response-element.component.html',
  styleUrls: ['./topic-response-element.component.scss']
})
export class TopicResponseElementComponent implements OnInit {

  @ViewChild('buttonsComponent')
  buttonsComponent: ButtonsComponent;
  @Input() payload: Payload;

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.payload)) {
      this.payload = <Payload>{
        elements: [<Element> {
            image_url: '',
            title: '',
            subtitle: '',
            buttons: []
          }]
      };
    }
  }

  updateButtons() {
    this.payload.elements[0].buttons = this.buttonsComponent.buttons;
  }

}
