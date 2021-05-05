import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-pop-tv-carousel',
  templateUrl: './pop-tv-carousel.component.html',
  styleUrls: ['./pop-tv-carousel.component.css']
})
export class PopTvCarouselComponent implements OnInit {
  // mobile: boolean = false;
  title = 'MoviesDB-AngularFrontend';
  constructor() {}
  ngOnInit(): void {
    // this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.HandsetPortrait]).subscribe(() => {
    //   this.mobile = true;
    // })
    // this.breakpointObserver.observe([Breakpoints.Web, Breakpoints.WebPortrait]).subscribe(() => {
    //   this.mobile = false;
    // })
    // console.log(this.mobile);
    // if (window.screen.width === 360) { // 768px portrait
    //   this.mobile = true;
    // }
    // if (this.breakpointObserver.isMatched('(max-width: 600px)')) {
    //   console.log('mobile');
    //   this.mobile = true;
    // } else this.mobile = false;
  }

}
