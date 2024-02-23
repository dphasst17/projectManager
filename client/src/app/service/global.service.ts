import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Global {
  public isLogin:boolean;
  public token:string;
  public role:string
  public exp:number;
  public modalDetail:boolean = false;
  private project = new BehaviorSubject<any[]>([]);
  currentProject = this.project.asObservable();
  private projectProcess = new BehaviorSubject<any[]>([]);
  currentProjectProcess = this.projectProcess.asObservable();
  private infoSource = new BehaviorSubject<any[]>([]);
  currentInfo = this.infoSource.asObservable();
  private staffSource = new BehaviorSubject<any[]>([]);
  currentStaff = this.staffSource.asObservable();
  constructor() {
    this.role = localStorage.getItem('role') || ''
    this.isLogin = localStorage.getItem('isLogin') === 'true'
    this.token = localStorage.getItem('t') || ''
    this.exp = Number(localStorage.getItem('e')) || 0
  }
  changeProject(project:any[]){
    this.project.next(project);
  }
  changeProjectProcess(project:any[]){
    this.projectProcess.next(project)
  }
  changeInfo(info: any[]) {
    this.infoSource.next(info);
  }
  changeStaffData(data:any[]) {
    this.staffSource.next(data);
  }
  getValueLocal(key:string){
    return localStorage.getItem(key)
  }
  pagination(length:number,itemsInPage:number) {
    let arrPage:any = []
    const handleFirst = length % itemsInPage === 0 ? length / itemsInPage : (length / itemsInPage) + 1
    for(let i = 1; i <= handleFirst; i++){
      arrPage = [...arrPage, i]
    }
    return arrPage
  }
  calculatorPage(length:number,activePages:number){
    return length * activePages
  }
  formatDate(type:string,date:string){
    return type === "-" ? date.split("/").reverse().join("-") : date.split("-").reverse().join("/") 
  }
}
