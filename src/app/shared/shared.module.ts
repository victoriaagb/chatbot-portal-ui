import { NgModule , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { SharedService } from './shared.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    CommonModule,
    MenuComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ SharedService ]
    };
  }

}
