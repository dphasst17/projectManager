import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-component.component.html',
  styleUrl: './staff-component.component.css'
})
export class StaffComponentComponent {
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


