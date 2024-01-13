import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Global {
  public globalVar: any;
  public project:any // Biến toàn cục của bạn

  constructor() {
    this.globalVar = 'Giá trị ban đầu';
    this.project = null
  }
}
