import { NgModule , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu/menu.component';
import { SharedService } from './shared.service';

import { StorageServiceModule} from 'angular-webstorage-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StorageServiceModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MenuComponent,
    StorageServiceModule
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
