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
  // Thông tin leader
  dataInfo: any = {}
  // Thông tin nhân viên trong team
  dataStaff:any = []
  //Thông tin khu vực  
  dataArea:any = []
  //Thống kê khu vực
  statisticsArea:any = []
  // Tổng tiền của team qua các dự án
  totalExpense:number = 0
  // Tổng tiền của dự án đang thực hiện tại
  dataExpense:any = []

  currentArea:string = ''
  // Những task đang thực hiện trong dự án hiện tại
  taskProcess:any = []
  // Những task đã hoàn thành trong dự án hiện tại
  taskComplete:any = []
  // Phần trăm hoàn thành dự án
  percentProject: number = 0

  projectProcess: any = {}
  ngOnInit(): void{
    //Tính tổng tiền của tất cả dự án được thực hiện bởi team
    this.globalService.currentProject.subscribe(p => this.totalExpense = p.map(e => e.expense).reduce((a,b) => a + b,0))
    //Lấy thông tin của leader
    this.globalService.currentInfo.subscribe(info => this.dataInfo = info[0]);
    // Lấy thông tin của nhân viên
    this.globalService.currentStaff.subscribe(staff => {
      this.dataStaff = staff
      // Thực hiện thống kê khu vực như sô nhân viên, số nhân viên đang nghỉ của từng khu vực
      this.statisticsArea = [...new Set(staff.map(e => e.area))].map(s => {
        return {
          area:s,
          total:staff.filter(f => f.area === s).length,
          break:staff.filter(f => f.area === s && f.action === 'break').length,
          detail:staff.filter(f => f.area === s)
        }
      })
    })
    // Lấy dự án đang thực hiện 
    this.globalService.currentProjectProcess.subscribe((p:any) => {
      //Cập nhật lại các biến như tổng tiền của dự án, task và tính % hoàn thành dự án
      this.dataExpense = p.expense
      this.projectProcess = p
      this.taskProcess = p.task?.length === 0 ? 0 : p.task?.filter((e:any) => e.status === 'processing').length
      this.taskComplete = p.task?.length === 0 ? 0 : p.task?.filter((e:any) => e.status === 'complete').length
      this.percentProject = (this.taskComplete / this.projectProcess.totalTask) * 100
    })
  }
  filterArea = (value: string) => {
    this.currentArea !== value ? this.currentArea = value : this.currentArea = ''
  }
}
