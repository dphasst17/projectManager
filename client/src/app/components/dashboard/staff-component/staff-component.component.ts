import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
import { ViewProjectComponent } from '../../form/view-project/view-project.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-staff-component',
  standalone: true,
  imports: [CommonModule,ViewProjectComponent,ReactiveFormsModule],
  templateUrl: './staff-component.component.html',
  styleUrl: './staff-component.component.css'
})
export class StaffComponentComponent implements OnInit {
  formEdit: FormGroup;
  formPassword: FormGroup;
  dataInfo:any = [];
  taskByProject:any = [];
  staffProject:any = [];
  projectDetail:any = [];
  listStaffProject:any = [];
  resultProject:any = [];
  formBoolean:any = {
    edit:false,
    password: false
  }
  constructor(private global: Global, private apiService: ApiService){
    this.formPassword = new FormGroup({
      'current': new FormControl(null, Validators.required),
      'new': new FormControl(null, Validators.required),
      'confirm': new FormControl(null, Validators.required),
    });
    this.formEdit = new FormGroup({
      'name': new FormControl(this.dataInfo?.name, Validators.required),
      'phone': new FormControl(this.dataInfo?.phone, Validators.required),
      'email': new FormControl(this.dataInfo?.email, [Validators.required, Validators.email]),
      'address': new FormControl(this.dataInfo?.address, Validators.required),
    });
    
  }
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
      this.formEdit.patchValue({
        'name': this.dataInfo?.name,
        'phone': this.dataInfo?.phone,
        'email': this.dataInfo?.email,
        'address': this.dataInfo?.address,
      });
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
  onSubmit(){
    if (this.formEdit.invalid) {
      Object.keys(this.formEdit.controls).forEach(field => {
        const control = this.formEdit.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return
    }
    this.apiService.fetchUpdateUser(this.global.token,this.formEdit.value)
    .then(res => {
      alert(res.message)
      if(res.status === 200){
        this.effectModal('edit')
        this.dataInfo = this.formEdit.value
      }
    })
  }
  onSubmitPassword(){
    const value = this.formPassword.value
    if (this.formPassword.invalid) {
      Object.keys(this.formPassword.controls).forEach(field => {
        const control = this.formPassword.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return
    }
    if(value.confirm !== value.new){
      alert("Confirm password doesn't match with new password")
      return
    }
    this.apiService.fetchUpdatePassword(this.global.token,{current:value.current,new:value.new})
    .then(res => {
      alert(res.message)
      if(res.status === 200){
        this.effectModal('password')
      } 
    })
  }
  effectModal(modal:string){
    this.formBoolean[modal] = !this.formBoolean[modal]
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


