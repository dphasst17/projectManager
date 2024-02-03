import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Global } from '../../../../service/global.service';
import { ApiService } from '../../../../api/api.service';
@Component({
  selector: 'app-staff-view-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-view-task.component.html',
  styleUrl: './staff-view-task.component.css'
})
export class StaffViewTaskComponent implements OnInit{
  taskTodo:any =[]
  constructor(private global:Global,private apiService:ApiService){}
  
  ngOnInit(): void {
    this.apiService.fetchTaskTodoByStaff(this.global.token)
    .then(res => this.taskTodo = res.data)
  }

}
