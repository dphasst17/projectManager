import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-leader-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader-project.component.html',
  styleUrl: './leader-project.component.css'
})
export class LeaderProjectComponent {
  onSubmit = (input:{projectName:string, dateOfStart: string, teamSize: string}) => {
    document.getElementById('projectName')?.classList.add(input.projectName === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('dateOfStart')?.classList.add(input.dateOfStart === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('teamSize')?.classList.add(input.teamSize === "" ? 'border-red-500' : 'border-green-500')

    if(input.projectName !== "" && input.dateOfStart !== "" && input.teamSize) {
      console.log(input)
      this.closeModal()
    }
  }
    showModal: boolean = false;
    modalScale: string = 'scale-0'
  
    openModal() {
      this.showModal = true;
      this.modalScale = 'scale-100'
    }
  
    closeModal() {
      this.showModal = false;
      this.modalScale = 'scale-0'
    }
  
}
