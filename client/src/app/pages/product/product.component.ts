import { Component } from '@angular/core';
import { LeaderProjectComponent } from '../../components/project/leader-project/leader-project.component';
import { StaffProjectComponent } from '../../components/project/staff-project/staff-project.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [LeaderProjectComponent, StaffProjectComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  role = localStorage.getItem('role')
}
