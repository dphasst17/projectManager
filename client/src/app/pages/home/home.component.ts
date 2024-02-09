import { Component } from '@angular/core';
import { StaffComponentComponent } from '../../components/dashboard/staff-component/staff-component.component';
import { LeaderComponentComponent } from '../../components/dashboard/leader-component/leader-component.component';
import { AdminComponent } from '../../components/dashboard/admin/admin.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,StaffComponentComponent,LeaderComponentComponent,AdminComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  role = localStorage.getItem('role')
}
