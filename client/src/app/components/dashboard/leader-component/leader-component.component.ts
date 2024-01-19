import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
@Component({
  selector: 'app-leader-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader-component.component.html',
  styleUrl: './leader-component.component.css'
})
export class LeaderComponentComponent implements OnInit {
  constructor(private globalService:Global,private apiService:ApiService){}
  role = this.globalService.role;
  dataInfo: any = {}
  dataStaff:any = []
  dataArea:any = []
  dataFilter:any = []

  totalExpense:number = 0
  dataExpense:any = []

  currentArea:string = ''

  taskProcess:any = []
  taskComplete:any = []
  percentProject: number = 0

  projectProcess: any = {}
  ngOnInit(): void{
    /* this.globalService.currentInfo.subscribe(info => {
      console.log(info[0]);
    }); */
    /* this.globalService.currentStaff.subscribe(staff => {console.log([...new Set(staff.map(e => e.area))])}) */
    this.globalService.currentInfo.subscribe(info => this.dataInfo = info[0]);
    this.globalService.currentStaff.subscribe(staff => {
      this.dataStaff = staff
      this.dataArea = [...new Set(staff.flatMap(e => e.area))]
    })
    this.apiService.fetchExpense().then(res => {
      this.totalExpense = Number(res.data[0].total)
      this.dataExpense = res.data.detail
    })
    this.apiService.fetchTaskProcess('complete').then(res => {
        const detail = res.data[0].detail
        this.percentProject = detail.length === 0 ? 0 : (detail.filter((e:any) => e.status === 'complete').length / res.data[0].totalTask) * 100
        console.log(detail.length === 0 ? 0 : (detail.filter((e:any) => e.status === 'complete').length / res.data[0].totalTask) * 100)
      }
    )
    this.apiService.fetchProjectByStatus('complete').then(res => {
      this.projectProcess = res.data[0]
      this.taskProcess = res.data[0].task.length === 0 ? 0 : res.data[0].task.filter((e:any) => e.status === 'processing').length
      this.taskComplete = res.data[0].task.length === 0 ? 0 : res.data[0].task.filter((e:any) => e.status === 'complete').length
    })
  }
  filterArea = (value: string) => {
    this.dataFilter = this.dataStaff.filter((e:any) => e.area === value)
    this.currentArea !== value ? this.currentArea = value : this.currentArea = ''
  }
}
