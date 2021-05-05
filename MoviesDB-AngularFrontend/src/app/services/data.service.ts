import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  ls: any = [];
  constructor(private httpClient: HttpClient, private breakpointObserver: BreakpointObserver) { }

  getData(url: any){
    var finalUrl = 'http://localhost:8080' + url;
    return this.httpClient.get(finalUrl);
	  // return this.httpClient.get(url);
  }

  formatData(data: any): any {
    let formattedData: any = [];
    let cnt = 0;
    let temp: any = [];
    for (var i=0; i < data.length; i++) {
      temp.push(data[i]);
      cnt+=1;
      if (cnt === 6) {
        cnt = 0;
        formattedData.push(temp);
        temp = [];
      } else if (i === data.length - 1) formattedData.push(temp);
    }
    return formattedData;
  }

  setLocalStorageItem(key: string, data: any){
    this.ls = this.getLocalStorageItem(key);
    if (this.ls === null) this.ls = [];
    else this.ls = JSON.parse(this.ls);
    if (this.ls.length === 0) this.ls.unshift(data);
    var isPresent: boolean = this.findInLocalStorage(this.ls, data)
    if ( !isPresent ) this.ls.unshift(data)
    if (this.ls.length > 24 && key === "currentlyPlaying") this.ls.splice(0, 1)
    localStorage.setItem(key, JSON.stringify(this.ls));
  }

  getLocalStorageItem(key: string): any {
    return localStorage.getItem(key);
  }

  findInLocalStorage(ls: any, data: any): boolean {
    if (ls === null) return false;
    for (var i=0; i<ls.length; i++) {
      if (data['id'] === ls[i]['id']) {
        ls.splice(i, 1)
        ls.unshift(data)
        this.ls = ls;
        return true;
      }
    }
    return false;
  }

  removeFromLocalStorage(lc: any, data: any) {
    for (var i=0; i<lc.length; i++) {
      if (data['id'] === lc[i]['id']) lc.splice(i, 1);
    }
    localStorage.setItem('myWatchlist', JSON.stringify(lc))
  }

  // checkIfMobile(): any {
  //   this.breakpointObserver
  //   .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
  //   .subscribe((state: BreakpointState) => {
  //     if (state.matches) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   })
  // }
}
