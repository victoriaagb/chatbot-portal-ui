import { NgModule , ModuleWithProviders, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu/menu.component';
import { SharedService } from './shared.service';

import { StorageServiceModule} from 'angular-webstorage-service';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { LoadingScreenService } from './services/loading-screen.service';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemElement } from './carousel/carousel-item-element.directive';
import { CarouselItemDirective } from './carousel/carousel-item.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    StorageServiceModule,
    BrowserAnimationsModule
  ],
  declarations: [
    MenuComponent,
    LoadingScreenComponent,
    CarouselComponent,
    CarouselItemElement,
    CarouselItemDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MenuComponent,
    StorageServiceModule,
    LoadingScreenComponent,
    BrowserAnimationsModule,
    CarouselComponent,
    CarouselItemElement,
    CarouselItemDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
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
