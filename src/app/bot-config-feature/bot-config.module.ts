import { NgModule } from '@angular/core';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { BotConfigRoutingModule } from './bot-config-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopicConfigComponent } from './topic-config/topic-config.component';
import { BotNameComponent } from './bot-name/bot-name.component';
import { BotDesignComponent } from './bot-design/bot-design.component';
import { BotConfigService } from './bot-config.service';
import { BotConfigRulesService } from './bot-config-rules.service';
import { TopicQuestionsComponent } from './topic-config/topic-questions/topic-questions.component';
import { TopicAnswersComponent } from './topic-config/topic-answers/topic-answers.component';
import { TopicNameComponent } from './topic-config/topic-name/topic-name.component';
import { TopicSliderComponent } from './topic-config/topic-slider/topic-slider.component';
import { TopicAnswersHomeComponent } from './topic-config/topic-answers/topic-answers-home/topic-answers-home.component';
import { TopicAnswersSliderComponent } from './topic-config/topic-answers/topic-answers-slider/topic-answers-slider.component';
import { TopicConfigService } from './topic-config/topic-config.service';
import { TopicResponseTextComponent } from './topic-config/topic-answers/topic-response-text/topic-response-text.component';
import { TopicResponseFollowComponent } from './topic-config/topic-answers/topic-response-follow/topic-response-follow.component';
import { TopicResponseButtonComponent } from './topic-config/topic-answers/topic-response-button/topic-response-button.component';
import { BotHeaderComponent } from './bot-header/bot-header.component';
import { BuildTheBotComponent } from './build-the-bot/build-the-bot.component';
import { ChatSimulatorComponent } from './chat-simulator/chat-simulator.component';
import { TopicResponseElementComponent } from './topic-config/topic-answers/topic-response-element/topic-response-element.component';
import { ButtonsComponent } from './topic-config/topic-answers/buttons/buttons.component';

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
    TopicAnswersHomeComponent,
    TopicAnswersSliderComponent,
    TopicResponseTextComponent,
    TopicResponseFollowComponent,
    TopicResponseButtonComponent,
    BotHeaderComponent,
    BuildTheBotComponent,
    ChatSimulatorComponent,
    TopicResponseElementComponent,
    ButtonsComponent,
  ],
  providers: [
    BotConfigService,
    TopicConfigService,
    BotConfigRulesService
  ]
})
export class BotConfigModule { }
