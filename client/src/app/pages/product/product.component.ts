import { Component } from '@angular/core';
import { LeaderProjectComponent } from '../../components/project/leader-project/leader-project.component';
import { StaffProjectComponent } from '../../components/project/staff-project/staff-project.component';
import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [LeaderProjectComponent,StaffProjectComponent,CommonModule],
=======
import { StaffProjectComponent1 } from '../../components/project/staff-project1/staff-project1.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [LeaderProjectComponent,StaffProjectComponent1, StaffProjectComponent, CommonModule, ReactiveFormsModule],
>>>>>>> Stashed changes
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
<<<<<<< Updated upstream
  role = localStorage.getItem('role')
=======
    role = localStorage.getItem('role') 
>>>>>>> Stashed changes
}
