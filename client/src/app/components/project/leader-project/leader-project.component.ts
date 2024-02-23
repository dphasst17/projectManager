import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
import { ViewProjectComponent } from '../../form/view-project/view-project.component';
interface InputType {
  name: string;
  startDate: string;
  endDate: string;
  teamSize: string;
  expense: string;
  totalTask: string;
  [key: string]: string;
}
@Component({
  selector: 'app-leader-project',
  standalone: true,
  imports: [CommonModule,ViewProjectComponent],
  templateUrl: './leader-project.component.html',
  styleUrl: './leader-project.component.css'
})


export class LeaderProjectComponent implements OnInit {


  ngOnInit(): void {
  }
  constructor(private global:Global,private apiService: ApiService){}
  
  
}
