import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { TopicConfigComponent } from './topic-config/topic-config.component';
import { BotNameComponent } from './bot-name/bot-name.component';
import { BotDesignComponent } from './bot-design/bot-design.component';
import { TopicQuestionsComponent } from './topic-questions/topic-questions.component';

const routes: Routes = [
  { path: 'bot-config',
    component: BotConfigComponent,
    children: [
      { path: '', pathMatch: 'prefix', redirectTo: 'bot-name'},
      { path: 'topic-config', component: TopicConfigComponent },
      { path: 'bot-name', component: BotNameComponent },
      // { path: ':botName', component: BotNameComponent },
      { path: 'bot-design', component: BotDesignComponent },
      { path: 'topic-questions', component: TopicQuestionsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class BotConfigRoutingModule { }
