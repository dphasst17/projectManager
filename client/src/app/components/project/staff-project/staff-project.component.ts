import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-project',
  standalone: true, // Bỏ qua thuộc tính này
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './staff-project.component.html',
  styleUrls: ['./staff-project.component.css'] // Sửa thành styleUrls
})
export class StaffProjectComponent {


  constructor() {
  }
  ngOnInit() {
  }
  onSubmit = (input:{taskname:string, description: string, project: string, assignedTo: string, priority: string, status: string}) => {
    document.getElementById('taskname')?.classList.add(input.taskname === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('description')?.classList.add(input.description === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('project')?.classList.add(input.project === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('assignedTo')?.classList.add(input.assignedTo === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('priority')?.classList.add(input.priority === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('status')?.classList.add(input.status === "" ? 'border-red-500' : 'border-green-500');

    if(input.taskname !== "" && input.description !== "" && input.project !== ""&& input.assignedTo !== ""&& input.priority !== ""&& input.status !== "") {
      console.log(input)
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
