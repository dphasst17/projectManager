import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Global } from '../../../../service/global.service';
import { ApiService } from '../../../../api/api.service';
@Component({
  selector: 'app-pm-view-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pm-view-task.component.html',
  styleUrl: './pm-view-task.component.css'
})
export class PmViewTaskComponent implements OnInit{
  allTask:any = []
  constructor(private global:Global,private apiService:ApiService){}
  ngOnInit(): void {
    this.apiService.fetchTaskByStatus('processing')
    .then(res => {
      if(res.status === 200){
        this.allTask = res.data
        return
      }else{
        console.log(res.message)
      }
    })
  }
  handleTask(type:string,idTask:number){
    let obj = type === 'confirm' ? {
      isBoth:true
    }
    : {
      isConfirm:true,
      confirmValue:'false'
    }
    this.apiService.fetchConfirmTask(idTask,obj).then(res => {
      if(res.status === 200){
        console.log(this.allTask)
        this.allTask = this.allTask.map((e:any) => {
          return {
            ...e,
            detail:e.detail.map((d:any) => {
              return {
                ...d,
                status:type === 'confirm' && d.idTask === idTask ? 'complete' : d.status,
                confirm:d.idTask === idTask ? 'false':  d.confirm
              }
            })
          }
        })
      }
    })
  }
}
