import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DataService } from '../../services/data.service';  

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  suggestedData: any = [];
  url: string = '';
  mobile_flag: boolean = false;

  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.checkIfMobile();
  }

  search: OperatorFunction<string, readonly {name: string, backdrop_path: string}[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(500),
    map(term => term === '' ? []:
    this.suggestedData)
  )
  formatter = (x: {name: string}) => x.name;
  
  textChanged(item: any) {
    this.url = '/apis/search/' + item.target.value;
    this.dataService.getData(this.url).subscribe(returnedData => {
      this.suggestedData = returnedData;
    })
  }

  onSelect($event: any, obj: any) {
    $event.preventDefault();
    obj.value = '';
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
