import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
import { DetailComponent } from '../detail/detail.component';
import { ProjectComponent } from '../addForm/project/project.component';
import { TaskComponent } from '../addForm/task/task.component';
@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule,DetailComponent,TaskComponent,ProjectComponent],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent implements OnInit {
  @Input() data:any;
  currentRole:string = ''
  position:any = ''
  project:any = [];
  projectDetail:any=[];
  currentProject:any=[]
  listStaffProject:any=[]
  detail:boolean = false;
  addForm:boolean = false;
  constructor(private global:Global,private apiService:ApiService){}
  ngOnInit(): void {
    this.currentRole = this.global.role
    this.global.currentInfo.subscribe(i => this.position = i[0]?.position)
    if(this.data.role === 'staff'){
      const token= this.global.getValueLocal('t')
      if(token){
        this.apiService.fetchProjectByStaff(token).then(res => {
          if(res.status === 200){
            this.project = res.data
          }
        })
      }
    }else{
      this.global.currentProject.subscribe(p => this.project = p)
    }
  }
  changeModal(event: boolean) {
    this.detail = event;
  }
  changeModalAddForm(event:boolean){
    this.addForm = event
  }
  fetchData(idProject:any){
    if(this.projectDetail.length === 0 ||this.projectDetail[0].idProject !== idProject ){
      this.apiService.fetchProjectById(idProject).then(res => {
        if(res.status === 200){
          this.projectDetail = res.data
          this.listStaffProject = res.data[0].teamDetail.flatMap((e:any) => e.staff)
        }
      })
    }
  }
  setCurrentProject(id:any){
    this.apiService.fetchProjectById(id).then(res => this.currentProject = res.data)
  }
  handleDelete(idProject:number){
    console.log(idProject)
    console.log(this.project.filter((f:any) => f.idProject !== idProject))
    this.apiService.fetchDeleteProject(idProject).then(res => {
      if(res.status === 200){
        const result = this.project.filter((f:any) => f.idProject !== idProject)
        this.global.changeProject(result)
        this.project = result
      }
      alert(res.message)
    })
  }
}
