import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { BotDashboardComponent } from './bot-dashboard/bot-dashboard.component';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './shared-components/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BotDashboardComponent,
    BotConfigComponent,
    LandingComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
