import { Component, OnInit, Input } from '@angular/core';
import { Button, ButtonType } from '../../../../shared/model/topic/button.model';
import * as _ from 'lodash';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  ButtonType = ButtonType;

  @Input() buttons: Button[];
  @Input() id: number;
  @Input() data: Map<string, string>;

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.buttons) || this.buttons.length === 0) {
      this.buttons = [];
      this.addButton();
    }
  }

  addButton() {
    let newButton: Button;
    newButton = {
      title: '',
      type: ButtonType.URL,
      url: ''
    };

    this.buttons.push(newButton);
    console.log(this.buttons);
  }

  removeButton(index: number) {
    this.buttons.splice(index, 1);
  }

  setPostback(index: number, key: string) {
    this.buttons[index].payload = this.data.get(key);
    this.buttons[index].title = key;

    if (_.isUndefined(this.buttons[index].payload)) {
      this.buttons[index].payload = '';
    }
  }

  getDataMap() {
    const dataMap = Array.from(this.data.entries());
    return dataMap;
  }

  handleChange(index: number) {
    if (this.buttons[index].type === ButtonType.URL) {
      delete this.buttons[index].payload;
    } else {
      delete this.buttons[index].url;
      this.buttons[index].payload = '';
      this.buttons[index].title = '';
    }
  }

}
