import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service'
import { NgbModal, ModalDismissReasons, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-t-mov-carousel',
  templateUrl: './t-mov-carousel.component.html',
  styleUrls: ['./t-mov-carousel.component.css']
})
export class TMovCarouselComponent implements OnInit {
  data: any = {};
  cast: any = [];
  media_id: any;
  media_type: any;
  media_heading1: any;
  media_heading2: any;
  closeResult = '';
  currentItem: any = [];
  watchlistButtonText: string = '';
  castDetails: any;
  twitterData: string = '';
  successMessage: any;
  type: any;
  message = new Subject<string>();
  mobile_flag: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private ngbModal: NgbModal, private breakpointObserver: BreakpointObserver) { }

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
    this.checkIfMobile();
    console.log(this.mobile_flag)
    this.media_type = this.activatedRoute.snapshot.paramMap.get('media_type');
    console.log(this.media_type)
    if (this.media_type === 'movie') {
      this.media_heading1 = "Recommended Movies";
      this.media_heading2 = "Similar Movies";
    }
    else if (this.media_type === 'tv') {
      this.media_heading1 = "Recommended TV Shows";
      this.media_heading2 = "Similar TV Shows";
    }
    this.media_id = this.activatedRoute.snapshot.paramMap.get('id');
    var detailsUrl = '/apis/watch/' + this.media_type + '/' + this.media_id;
    this.setData(detailsUrl);
  }

  ngDoCheck() {
    this.checkIfMobile();
    if (this.media_id !== this.activatedRoute.snapshot.paramMap.get('id') && this.media_type !== this.activatedRoute.snapshot.paramMap.get('media_type')) {
      this.media_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.media_type = this.activatedRoute.snapshot.paramMap.get('media_type')
      var detailsUrl = '/apis/watch/' + this.media_type + '/' + this.media_id;
      this.setData(detailsUrl)
    }
    else if (this.media_id !== this.activatedRoute.snapshot.paramMap.get('id')) {
      this.media_id = this.activatedRoute.snapshot.paramMap.get('id');
      var detailsUrl = '/apis/watch/' + this.media_type + '/' + this.media_id;
      this.setData(detailsUrl)
    }
  }

  setData(detailsUrl: any): any {    
    this.dataService.getData(detailsUrl).subscribe((returnedData: any) => {
      this.data = returnedData; 
      this.twitterData = "Watch " + this.data['title'] + '%0D' + "https://www.youtube.com/watch?v=" + this.data['trailer'] +  " %0D%23USC %23CSCI571 %23FightOn"
      this.currentItem = {"id": this.data['id'], "name": this.data['title'], "poster_path": this.data['poster_path'], "media_type": this.media_type};
      this.dataService.setLocalStorageItem('currentlyPlaying', this.currentItem);
      if ( this.dataService.findInLocalStorage(JSON.parse(this.dataService.getLocalStorageItem('myWatchlist')), this.currentItem)) this.watchlistButtonText = "Remove from Watchlist";
      else this.watchlistButtonText = "Add to Watchlist"
      this.message.subscribe(message => this.successMessage = message);
      this.message.pipe(debounceTime(5000)).subscribe(() => {
        if (this.selfClosingAlert) {
          this.selfClosingAlert.close();
        }
      });
    })
  }

  watchlistFunc() {
    if (this.watchlistButtonText === "Add to Watchlist") {
      this.dataService.setLocalStorageItem('myWatchlist', this.currentItem);
      this.watchlistButtonText = "Remove from Watchlist";
      this.type = 'success';
      this.message.next('Added to watchlist');
    }
    else if (this.watchlistButtonText === "Remove from Watchlist") {
      this.dataService.removeFromLocalStorage(JSON.parse(this.dataService.getLocalStorageItem('myWatchlist')), this.currentItem)
      this.watchlistButtonText = "Add to Watchlist";
      this.type = 'danger';
      this.message.next('Removed from watchlist');
    }
  }

  openLg(content: any, castId: any) {
    var url = "/apis/person/" + castId;
    this.dataService.getData(url).subscribe((returned_data: any) => {
      this.castDetails = returned_data;
    })
    this.ngbModal.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
