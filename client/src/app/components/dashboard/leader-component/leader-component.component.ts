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
  statisticsArea:any = []
  totalExpense:number = 0
  dataExpense:any = []

  currentArea:string = ''

  taskProcess:any = []
  taskComplete:any = []
  percentProject: number = 0

  projectProcess: any = {}
  ngOnInit(): void{
    this.globalService.currentInfo.subscribe(info => this.dataInfo = info[0]);
    this.globalService.currentStaff.subscribe(staff => {
      this.dataStaff = staff
      this.statisticsArea = [...new Set(staff.map(e => e.area))].map(s => {
        return {
          area:s,
          total:staff.filter(f => f.area === s).length,
          break:staff.filter(f => f.area === s && f.action === 'break').length,
          detail:staff.filter(f => f.area === s)
        }
      })
    })
    this.apiService.fetchExpense().then(res => {
      this.totalExpense = Number(res.data[0].total)
      this.dataExpense = res.data.detail
    })
    this.apiService.fetchProjectByStatus('processing').then(res => {
      this.projectProcess = res.data[0]
      this.taskProcess = res.data[0].task.length === 0 ? 0 : res.data[0].task.filter((e:any) => e.status === 'processing').length
      this.taskComplete = res.data[0].task.length === 0 ? 0 : res.data[0].task.filter((e:any) => e.status === 'complete').length
      this.percentProject = (this.taskComplete / this.projectProcess.totalTask) * 100

    })
  }
  filterArea = (value: string) => {
    this.currentArea !== value ? this.currentArea = value : this.currentArea = ''
  }
}
