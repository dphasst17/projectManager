import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Global } from '../../../../service/global.service';
import { ApiService } from '../../../../api/api.service';
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
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent implements OnInit{
  @Input() data:any;
  @Output() changeForm = new EventEmitter<boolean>();
  @Output() changeProject:any = new EventEmitter<any[]>();
  staff:any = []
  listStaff:any = [];
  constructor(private global:Global,private apiService:ApiService) {}
  ngOnInit(): void {
    this.global.currentStaff.subscribe(data => this.staff = data)
  }

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
      const resultData = {
        ...input,
        detail:this.staff.filter((f:any) => this.listStaff.includes(f.idUser)).map((e:any) => {return{idUser:e.idUser,role:e.position}})
      }
      this.apiService.fetchCreateProject(resultData).then(res => {
        const result = {
          ...input,
          idProject:res.data.idProject,
          spent:0,
          startDate:new Date(input.startDate).toLocaleDateString(),
          endDate:new Date(input.endDate).toLocaleDateString(),
          projectStatus:"hasn't started"
        }
        if(res.status === 201){
          this.changeProject.emit ([...this.data.project,result])
          this.global.changeProject([...this.data.project,result])
          this.changeForm.emit(false)
          this.listStaff = []
        }else{
          alert(res.message)
        }
      })
    }
}
  addStaff(id:string){
    this.listStaff = this.listStaff.filter((e:string) => e.includes(id)).length !== 0 ? this.listStaff.filter((e:string) => e !== id) : [id,...this.listStaff]
  } 
}
