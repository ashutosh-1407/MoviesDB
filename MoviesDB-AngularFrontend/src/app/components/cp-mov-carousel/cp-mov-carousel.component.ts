import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DataService } from '../../services/data.service'
// import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cp-mov-carousel',
  templateUrl: './cp-mov-carousel.component.html',
  styleUrls: ['./cp-mov-carousel.component.css']
})
export class CpMovCarouselComponent implements OnInit {
  data: any = [];
  mobile_flag: boolean = false;
  showNavigationArrows: boolean = true;
  showNavigationIndicators: boolean = true;
  showText: boolean;

  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) { this.showText = false; }

  ngOnInit(): void {
    this.checkIfMobile();
    this.dataService.getData('/apis/cpSearch').subscribe((returned_data: any) => {
      this.data = returned_data;
    });
  }

  checkIfMobile() {
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        // console.log('The device is mobile');
        this.mobile_flag = true;
        this.showNavigationIndicators = false;
      }
    })
  }

  // @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
}
