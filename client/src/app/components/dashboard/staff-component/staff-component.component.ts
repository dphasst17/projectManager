import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
import { ViewProjectComponent } from '../../form/view-project/view-project.component';
@Component({
  selector: 'app-staff-component',
  standalone: true,
  imports: [CommonModule,ViewProjectComponent],
  templateUrl: './staff-component.component.html',
  styleUrl: './staff-component.component.css'
})
export class StaffComponentComponent implements OnInit {
  dataInfo:any = [];
  taskByProject:any = [];
  staffProject:any = [];
  projectDetail:any = [];
  listStaffProject:any = [];
  resultProject:any = [];
  constructor(private global: Global, private apiService: ApiService){}
  ngOnInit(){
    const token= this.global.getValueLocal('t')
    if(token){
      this.apiService.fetchProjectByStaff(token).then(res => {
        if(res.status === 200){
          this.staffProject = res.data
        }
      })
    }
    this.global.currentInfo.subscribe(staff => {
      this.dataInfo = staff[0]
      const listProject = Array.from(new Set(staff[0]?.task.map((e:any) => e.nameProject)))
      const formatProject = listProject.map((e:any) => {
        return {
          project:e,
          detail:staff[0]?.task.filter((t:any) => e.includes(t.nameProject)) 
        }
      })
      this.resultProject = formatProject
    })
  }
  showModal: boolean = false;
  detailModel:boolean = false
  modalScale: string = 'scale-0'
  changeModal(){
    this.showModal = !this.showModal
    this.modalScale = this.showModal === true ? 'scale-100' : 'scale-0'
  }
  viewDetail(){
    this.detailModel = !this.detailModel
  }
  fetchData(idProject:any){
    this.apiService.fetchProjectById(idProject).then(res => {
      if(res.status === 200){
        this.projectDetail = res.data
        this.listStaffProject = res.data[0].teamDetail.flatMap((e:any) => e.staff)
        /* console.log(res.data[0].teamDetail.flatMap((e:any) => e.staff)) */
      }
    })
  }
  formatDate(date:any){
    return date.split("/").reverse().join("-")
  }
}


