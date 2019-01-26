import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { BotConfigRepository } from '../shared/model/bot-config-repository.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'chat-portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeIndex = 0;
  currentBot: BotConfigRepository;
  private subscription: Subscription;

  constructor(private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription = this.sharedService.getCurrentBot().subscribe( data => {
      this.currentBot = data.botconfig;
      if (this.currentBot) {
        this.activeIndex = 3;
      }
      console.log(this.currentBot);
    });
  }

  ngOnInit() {
    console.log('Testing screen size' + this.sharedService.getScreenWidth());
    this.currentBot = this.sharedService.currentBot;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createBot() {
    this.selectHeaderItem(1);
    this.router.navigate(['/bot-config']);
  }

  selectHeaderItem(index) {
    this.sharedService.sendCurrentBot(null);
    this.activeIndex = index;
  }

  isMobile() {
    return (this.sharedService.getScreenWidth() < 992);
  }

}
