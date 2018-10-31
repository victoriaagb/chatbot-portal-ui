import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  screenWidth: number;

  constructor() { }

  getScreenWidth() {
    return this.screenWidth;
  }

  setScreenWidth(screenWidth: number) {
    this.screenWidth = screenWidth;
  }

}
