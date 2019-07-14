import { Component, AfterViewInit, ContentChildren, QueryList, ViewChildren, ElementRef, ViewChild, Input, SimpleChanges } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselItemElement } from './carousel-item-element.directive';
import { AnimationFactory, AnimationBuilder, AnimationPlayer, animate, style } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @Input() timing = '250ms ease-in';
  @Input() showControls = true;

  @Input() itemsLength: number;

  @ContentChildren(CarouselItemDirective)
  items: QueryList<CarouselItemDirective>;

  @ViewChild('carousel')
  private carousel: ElementRef;

  @ViewChildren(CarouselItemElement, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;

  private player: AnimationPlayer;
  private itemWidth: number;
  private _currentSlide = 0;

  carouselWrapperStyle = {};

  constructor(private builder: AnimationBuilder ) {
   }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('ngAfterViewInit');
      this.updateItems();
    });
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges');
    this.updateItems();

  }

  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  get currentSlide() {
    return this._currentSlide;
  }

  @Input()
  set currentSlide(currentSlide: number){
    this._currentSlide = currentSlide;
    this.moveToCurrentSlide();
  }

  moveToCurrentSlide() {
    if (_.get(this.itemsElements, 'first.nativeElement')) {
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      const offset = this._currentSlide * (this.itemWidth);
      const myAnimation: AnimationFactory = this.buildAnimation(offset);
      this.player = myAnimation.create(this.carousel.nativeElement);
      this.player.play();
      console.log('next items.length: ' +  this.items.length);
    }
  }

  next() {
    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    if ( this.currentSlide + 1 === this.itemsLength ) { return; }

    this.currentSlide = (this.currentSlide + 1) % this.itemsLength;

    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  prev() {
    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    if ( this.currentSlide === 0 ) { return; }

     this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
     const offset = this.currentSlide * this.itemWidth;

     const myAnimation: AnimationFactory = this.buildAnimation(offset);

     this.player = myAnimation.create(this.carousel.nativeElement);
     this.player.play();
   }

   updateItems() {
    //TODO
    if(this.itemsElements){
      this.carouselWrapperStyle = {
        width: `${this.itemsLength * 100}%`
      }
    }
  }

}
