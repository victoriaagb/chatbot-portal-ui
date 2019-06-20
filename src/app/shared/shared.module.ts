import { NgModule , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu/menu.component';
import { SharedService } from './shared.service';

import { StorageServiceModule} from 'angular-webstorage-service';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { LoadingScreenService } from './services/loading-screen.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StorageServiceModule,
    BrowserAnimationsModule
  ],
  declarations: [
    MenuComponent,
    LoadingScreenComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MenuComponent,
    StorageServiceModule,
    LoadingScreenComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ SharedService , LoadingScreenService ]
    };
  }

}
