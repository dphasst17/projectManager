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
  staff:any = [];
  project:any = [];
  projectDetail:any = [];
  listStaff:any = [];
  listStaffProject:any = []
  showModal: boolean = false;
  editModal:boolean = false;
  modalScale: string = 'hidden'


  ngOnInit(): void {
    this.global.currentStaff.subscribe(data => this.staff = data)
    this.global.currentProject.subscribe(p => this.project = p)
  }
  constructor(private global:Global,private apiService: ApiService){}
  onSubmit = (input:InputType) => {
    document.getElementById('projectName')?.classList.add(input.name === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('dateOfStart')?.classList.add(input.startDate === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('teamSize')?.classList.add(input.teamSize === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('expense')?.classList.add(input.expense === "" ? 'border-red-500' : 'border-green-500')
    document.getElementById('task')?.classList.add(input.totalTask === "" ? 'border-red-500' : 'border-green-500')

    if(this.listStaff.length !== Number(input.teamSize)){
      alert('Please select enough according to the number of employees')
      return
    }

    if(Object.keys(input).every((e: keyof typeof input) => input[e] !== '')) {
      const result = {
        ...input,
        idProject:this.project.length + 1,
        spent:0,
        startDate:new Date(input.startDate).toLocaleDateString(),
        endDate:new Date(input.endDate).toLocaleDateString(),
        projectStatus:"hasn't started"
      }
      this.global.changeProject([...this.project,result])
      this.changeModal()
      this.listStaff = []
    }
}


    changeModal(){
      this.editModal = false
      this.showModal = !this.showModal;
      this.modalScale = this.showModal === true ? 'block' : 'hidden'
    }
    changeEditModal(){
      this.showModal = false
      this.editModal = !this.editModal;
    }
    addStaff(id:string){
      this.listStaff = this.listStaff.filter((e:string) => e.includes(id)).length !== 0 ? this.listStaff.filter((e:string) => e !== id) : [id,...this.listStaff]
    } 
    fetchData(idProject:any){
      this.apiService.fetchProjectById(idProject).then(res => {
        if(res.status === 200){
          this.projectDetail = res.data
          this.listStaffProject = res.data[0].teamDetail.flatMap((e:any) => e.staff)
        }
      })
    }
    formatDate(date:any){
      return date.split("/").reverse().join("-")
    }
  
}
