import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DataService } from 'src/app/services/data.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pop-mov-carousel',
  templateUrl: './pop-mov-carousel.component.html',
  styleUrls: ['./pop-mov-carousel.component.css']
})
export class PopMovCarouselComponent implements OnInit {
  @Input() images_data: any = [];
  @Input() type: string = ''
  @Input() media_id: any;
  mobile_flag: boolean = false;
  showNavigationArrows: boolean = true;
  showNavigationIndicators: boolean = true;
  media_type: string = '';
  data: any = [];
  url: string = '';
  in_media_id: any;
  dataIsPresent: any = '';
  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) { }
  // @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  ngOnInit(): void {
    // this.dataService.checkIfMobile().subscribe((result: any) => {
    //   this.mobile_flag = result;
    //   if (this.mobile_flag) this.showNavigationIndicators = false;
    //   console.log(this.mobile_flag, this.showNavigationIndicators)
    // })
    console.log(this.showNavigationIndicators)
    this.checkIfMobile();
    this.in_media_id = this.media_id;
    if (this.type.includes('Movies')) this.media_type = 'movie'
    else if (this.type.includes('TV')) this.media_type = 'tv'
    if (this.type === "Popular Movies") this.url = 'movieSearch/popular'
    else if (this.type === "Top Rated Movies") this.url = 'movieSearch/top-rated'
    else if (this.type === "Trending Movies") this.url = 'movieSearch/trending'
    else if (this.type === "Popular TV Shows") this.url = 'tvSearch/popular'
    else if (this.type === "Top Rated TV Shows") this.url = 'tvSearch/top-rated'
    else if (this.type === "Trending TV Shows") this.url = 'tvSearch/trending'
    else if (this.type.includes("Recommended")) this.url = this.media_type + '/recommended' + '/' + this.in_media_id
    else if (this.type.includes("Similar")) this.url = this.media_type + '/similar' + '/' + this.in_media_id
    this.dataService.getData('/apis/' + this.url).subscribe((returned_data: any) => {
      if (!this.mobile_flag) this.images_data = this.dataService.formatData(returned_data);
      else this.images_data = returned_data;
      if (this.images_data.length !== 0) this.dataIsPresent = 'true';
      else this.dataIsPresent = '';
    })
  }

  ngDoCheck() {
    this.checkIfMobile();
    if (this.in_media_id !== this.media_id) {
      this.in_media_id = this.media_id;
      if (this.type.includes("Recommended")) this.url = this.media_type + '/recommended' + '/' + this.in_media_id;
      else if (this.type.includes("Similar")) this.url = this.media_type + '/similar' + '/' + this.in_media_id;
      this.dataService.getData('/apis/' + this.url).subscribe((returned_data: any) => {
      if (!this.mobile_flag) this.images_data = this.dataService.formatData(returned_data);
      else this.images_data = returned_data;
      if (this.images_data.length !== 0) this.dataIsPresent = 'true';
      else this.dataIsPresent = '';
    })
    }
  }

  checkIfMobile() {
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        // console.log('The device is mobile');
        this.mobile_flag = true;
        this.showNavigationIndicators = false;
        // this.showNavigationArrows = false;
        // console.log('testing', this.carousel.showNavigationArrows);
      }
    })
  }
}