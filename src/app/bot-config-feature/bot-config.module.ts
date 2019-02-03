import { NgModule } from '@angular/core';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { BotConfigRoutingModule } from './bot-config-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopicConfigComponent } from './topic-config/topic-config.component';
import { BotNameComponent } from './bot-name/bot-name.component';
import { BotDesignComponent } from './bot-design/bot-design.component';
import { BotConfigService } from './bot-config.service';
import { TopicQuestionsComponent } from './topic-config/topic-questions/topic-questions.component';
import { TopicAnswersComponent } from './topic-config/topic-answers/topic-answers.component';
import { TopicNameComponent } from './topic-config/topic-name/topic-name.component';
import { TopicSliderComponent } from './topic-config/topic-slider/topic-slider.component';

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
    TopicQuestionsComponent,
    TopicAnswersComponent,
    TopicNameComponent,
    TopicSliderComponent,
  ],
  providers: [
    BotConfigService
  ]
})
export class BotConfigModule { }
