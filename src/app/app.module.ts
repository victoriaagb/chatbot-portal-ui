import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { BotDashboardComponent } from './bot-dashboard/bot-dashboard.component';
import { BotConfigModule } from './bot-config-feature/bot-config.module';
import { SharedModule } from './shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { TopicAnswersBackupComponent } from './topic-answers-backup/topic-answers-backup.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BotDashboardComponent,
    LandingComponent,
    TopicAnswersBackupComponent
  ],
  imports: [
    BotConfigModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
