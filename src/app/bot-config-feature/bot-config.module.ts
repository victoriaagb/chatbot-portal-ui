import { NgModule } from '@angular/core';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { BotConfigRoutingModule } from './bot-config-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopicConfigComponent } from './topic-config/topic-config.component';
import { BotNameComponent } from './bot-name/bot-name.component';
import { BotDesignComponent } from './bot-design/bot-design.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    BotConfigRoutingModule
  ],
  declarations: [
    BotConfigComponent,
    TopicConfigComponent,
    BotNameComponent,
    BotDesignComponent,
  ]
})
export class BotConfigModule { }
