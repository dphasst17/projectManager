import { Component, Input, OnInit,EventEmitter,Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
interface InputType {
  name: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  expense: number;
  totalTask: number;
  [key: string]: string | number;
}
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  @Input() data:any;
  @Output() detailChange = new EventEmitter<boolean>();
  @Output() changeProject = new EventEmitter<any>();
  constructor(private global:Global, private apiService: ApiService){}
  staff:any = []
  ngOnInit(): void {
    
  }
  check(){
    console.log(this.data)
  }
  updateProject(input:InputType){
    const idProject = this.data.projectDetail[0].idProject
    const currentData = this.data.projectDetail.map((e:any) => {
      return {
        name: e.name,
        startDate: this.global.formatDate('/',e.startDate),
        endDate: this.global.formatDate('/',e.endDate),
        teamSize: e.teamSize,
        expense: e.expense,
        totalTask: e.totalTask,
      }
    })
    let isChange = currentData.some((o:any) => 
      Object.keys(input).every(key => 
        o.hasOwnProperty(key) && 
        o[key] === input[key]
      )
    );
    !isChange && this.apiService.fetchUpdateProject(idProject,input)
    .then((res:any) => {
      alert(res.message)
      if(res.status === 200){
        this.detailChange.emit(false)
        this.changeProject.emit(this.data.projectDetail.map((e:any) => {
          return {
            ...e,
            name:input.name,
            startDate:this.formatDateReverse(input.startDate),
            endDate:this.formatDateReverse(input.endDate),
            teamSize:input.teamSize,
            expense:input.expense,
            totalTask:input.totalTask
          }
        }))
        this.global.currentProject.subscribe((e:any) => {
          
          this.global.changeProject(e.map((d:any) => {
            return {
              ...d,
              name:input.name,
              startDate:this.global.formatDate('/',input.startDate),
              endDate:this.global.formatDate('/',input.endDate),
              teamSize:input.teamSize,
              expense:input.expense,
              totalTask:input.totalTask
            }
          }))
        })
      }
    })
  }
  parseToInt(value: string): number {
    return parseInt(value, 10);
  }
  formatDate(date:any){
    return date.split("/").reverse().join("-")
  }
  formatDateReverse(date:any){
    return date.split("-").reverse().join("/")
  }
}
