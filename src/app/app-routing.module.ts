import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BotDashboardComponent } from './bot-dashboard/bot-dashboard.component';
import { BotConfigComponent } from './bot-config/bot-config.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'bot-config', component: BotConfigComponent },
  { path: 'bot-dashboard', component: BotDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}
