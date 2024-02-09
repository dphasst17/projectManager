import { filter } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Global } from '../../../../service/global.service';
import { ApiService } from '../../../../api/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  @Input() data:any;
  @Output() changeForm = new EventEmitter<boolean>();
  staff:any = []

  constructor(private global:Global,private apiService:ApiService) {}
  ngOnInit(): void {
    this.global.currentStaff.subscribe(data => this.staff = data.filter(f => f.idUser !== 'leader' && f.idUser !== 'projectmanager'))
  }

  submitTask(){
    let listTask: any[] = [];
    let result:any[] = []
    let isValid:boolean = true
    if(this.data.project && this.data.project.length > 0 && this.data.project[0]?.totalTask) {
      Array.from({ length: this.data.project[0].totalTask }, (_, i) => {
        const taskName = document.getElementById(`taskName${i}`) as HTMLInputElement;
        const desc = document.getElementById(`desc${i}`) as HTMLInputElement;
        const start = document.getElementById(`start${i}`) as HTMLInputElement;
        const end = document.getElementById(`end${i}`) as HTMLInputElement;
        const assigned = document.getElementById(`assigned${i}`) as HTMLInputElement;
        taskName.value === '' ? (taskName.classList.remove('border-black'),taskName.classList.add('border-red-500'),isValid = false) : (taskName.classList.remove('border-red-500'),taskName.classList.add('border-black'),isValid = true)
        desc.value === '' ? (desc.classList.remove('border-black'),desc.classList.add('border-red-500'),isValid = false) : (desc.classList.remove('border-red-500'),desc.classList.add('border-black'),isValid = true)
        start.value === '' ? (start.classList.remove('border-black'),start.classList.add('border-red-500'),isValid = false) : (start.classList.remove('border-red-500'),start.classList.add('border-black'),isValid = true)
        end.value === '' ? (end.classList.remove('border-black'),end.classList.add('border-red-500'),isValid = false) : (end.classList.remove('border-red-500'),end.classList.add('border-black'),isValid = true)
        assigned.value === '' ? (assigned.classList.remove('border-black'),assigned.classList.add('border-red-500'),isValid = false) : (assigned.classList.remove('border-red-500'),assigned.classList.add('border-black'),isValid = true)
        listTask = [...listTask,{
          taskName: taskName?.value ,
          desc: desc?.value ,
          start: start?.value ,
          end: end?.value ,
          assigned: assigned?.value
        }]
        
    });
  if(isValid){
    this.apiService.fetchCreateTask(this.data.project[0].idProject,listTask).then(res => {
      if(res.status === 201){
        this.changeForm.emit(false)
      }
    })
  }
}

    
  }

}
