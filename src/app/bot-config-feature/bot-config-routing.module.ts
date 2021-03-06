import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { TopicConfigComponent } from './topic-config/topic-config.component';
import { BotNameComponent } from './bot-name/bot-name.component';
import { BotDesignComponent } from './bot-design/bot-design.component';
import { TopicQuestionsComponent } from './topic-config/topic-questions/topic-questions.component';
import { TopicAnswersComponent } from './topic-config/topic-answers/topic-answers.component';
import { TopicNameComponent } from './topic-config/topic-name/topic-name.component';
import { BuildTheBotComponent } from './build-the-bot/build-the-bot.component';

const routes: Routes = [
  { path: 'bot-config',
    component: BotConfigComponent,
    children: [
      { path: '', pathMatch: 'prefix', redirectTo: 'bot-name'},
      { path: 'topic-config', component: TopicConfigComponent ,
       children: [
        { path: '', pathMatch: 'prefix', redirectTo: 'topic-name'},
          { path: 'topic-name', component: TopicNameComponent },
          { path: 'topic-questions', component: TopicQuestionsComponent },
          { path: 'topic-answers', component: TopicAnswersComponent }
          ] },
      { path: 'bot-name', component: BotNameComponent },
      // { path: ':botName', component: BotNameComponent },
      { path: 'build-the-bot', component: BuildTheBotComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class BotConfigRoutingModule { }
