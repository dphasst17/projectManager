import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Global {
  public project:any // Biến toàn cục của bạn
  public isLogin:boolean;
  public token:string;
  public role:string
  public exp:number
  private infoSource = new BehaviorSubject<any[]>([]);
  currentInfo = this.infoSource.asObservable();
  private staffSource = new BehaviorSubject<any[]>([]);
  currentStaff = this.staffSource.asObservable();
  constructor() {
    this.project = null;
    this.role = localStorage.getItem('role') || ''
    this.isLogin = localStorage.getItem('isLogin') === 'true'
    this.token = localStorage.getItem('t') || ''
    this.exp = Number(localStorage.getItem('e')) || 0
  }
  changeInfo(info: any[]) {
    this.infoSource.next(info);
  }
  changeStaffData(data:any[]) {
    this.staffSource.next(data);
  }
}
