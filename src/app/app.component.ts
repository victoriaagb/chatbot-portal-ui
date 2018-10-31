import { Component } from '@angular/core';
import { HostListener } from "@angular/core";
import { SharedService } from "./shared/shared.service";

@Component({
  selector: 'chatbot-portal-ui',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  screenHeight: any;
  screenWidth: any;
  smBreakpoint = 992;


  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.sharedService.setScreenWidth(this.screenWidth);
  }

  constructor(private sharedService : SharedService ) {
    this.onResize();
  }
}
