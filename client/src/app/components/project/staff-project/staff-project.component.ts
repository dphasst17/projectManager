import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Global } from '../../../service/global.service';
import { ViewProjectComponent } from '../../form/view-project/view-project.component';
import { PmViewTaskComponent } from '../../form/view-task/pm-view-task/pm-view-task.component';
import { StaffViewTaskComponent } from '../../form/view-task/staff-view-task/staff-view-task.component';
@Component({
  selector: 'app-staff-project',
  standalone: true,
  imports: [CommonModule,ViewProjectComponent,PmViewTaskComponent,StaffViewTaskComponent],
  templateUrl: './staff-project.component.html',
  styleUrls: ['./staff-project.component.css']
})
export class StaffProjectComponent implements OnInit {
  position:string = ''
  constructor(private global:Global) {
  }
  ngOnInit() {
    this.global.currentInfo.subscribe(i => this.position = i[0]?.position)
  }
  //handleAddTask?
  onSubmit = (input:{taskname:string, description: string, project: string, assignedTo: string, priority: string, status: string}) => {
    document.getElementById('taskname')?.classList.add(input.taskname === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('description')?.classList.add(input.description === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('project')?.classList.add(input.project === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('assignedTo')?.classList.add(input.assignedTo === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('priority')?.classList.add(input.priority === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('status')?.classList.add(input.status === "" ? 'border-red-500' : 'border-green-500');

    if(input.taskname !== "" && input.description !== "" && input.project !== ""&& input.assignedTo !== ""&& input.priority !== ""&& input.status !== "") {
      this.closeModal()
    }
  }

  showModal: boolean = false;
  modalScale: string = 'scale-0';

  openModal() {
    this.showModal = true;
    this.modalScale = 'scale-100';
  }

  closeModal() {
    this.showModal = false;
    this.modalScale = 'scale-0';
  }
}
