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
}
