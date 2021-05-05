import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-cw-carousel',
  templateUrl: './cw-carousel.component.html',
  styleUrls: ['./cw-carousel.component.css']
})
export class CwCarouselComponent implements OnInit {
  currentlyPlaying: any = '';
  formattedData: any = [];
  data: any=[];
  mobile_flag: boolean = false;
  showNavigationArrows: boolean = true;
  showNavigationIndicators: boolean = true;
  // @Input() mobile_flag: boolean = false;

  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.checkIfMobile();
    this.currentlyPlaying = localStorage.getItem('currentlyPlaying');
    if (this.currentlyPlaying !== null) this.currentlyPlaying = JSON.parse(this.currentlyPlaying);
    if (!this.mobile_flag && this.currentlyPlaying !== null) this.formattedData = this.dataService.formatData(this.currentlyPlaying);
    else if (this.mobile_flag && this.currentlyPlaying !== null) this.formattedData = this.currentlyPlaying;
    else this.formattedData = '';
    if (!this.mobile_flag && this.currentlyPlaying !== null && this.currentlyPlaying.length <=6) {
      this.showNavigationArrows = false;
      this.showNavigationIndicators = false;
    }
    else if (this.mobile_flag && this.currentlyPlaying !== null && this.currentlyPlaying.length <=1) this.showNavigationArrows = false; 
  }

  checkIfMobile() {
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('The device is mobile');
        this.mobile_flag = true;
        this.showNavigationIndicators = false;
        // this.showNavigationArrows = false;
      }
    })
  }

}