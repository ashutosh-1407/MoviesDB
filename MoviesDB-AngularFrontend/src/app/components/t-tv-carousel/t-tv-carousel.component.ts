import { Component, OnInit, ViewChild } from '@angular/core';
import { convertToObject } from 'typescript';
import { DataService } from '../../services/data.service'
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-t-tv-carousel',
  templateUrl: './t-tv-carousel.component.html',
  styleUrls: ['./t-tv-carousel.component.css']
})
export class TTvCarouselComponent implements OnInit {
  formattedData: any = [];
  myWatchlist: any = [];
  data: any=[];
  dataIsPresent: any = '';
  mobile_flag: boolean = false;

  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.checkIfMobile();
    this.myWatchlist = localStorage.getItem('myWatchlist');
    if (this.myWatchlist !== null) this.myWatchlist = JSON.parse(this.myWatchlist);
    else this.myWatchlist = [];
    this.formattedData = this.dataService.formatData(this.myWatchlist);
    if (this.formattedData.length !== 0) this.dataIsPresent = 'true';
  }

  checkIfMobile() {
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        // console.log('The device is mobile');
        this.mobile_flag = true;
      }
    })
  }

}
