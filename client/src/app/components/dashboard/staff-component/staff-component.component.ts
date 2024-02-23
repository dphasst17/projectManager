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
  //Thông tin nhân viên
  dataInfo:any = [];
  //Danh sách nhân viên trong dự án
  staffProject:any = [];
  projectDetail:any = [];
  //Thông tin dự án đã tham gia và các task đã thực hiên trong dự án đó của nhân viên
  resultProject:any = [];
  //Trạng thái cho 2 form là edit info và update password
  formBoolean:any = {
    edit:false,
    password: false
  }
  constructor(private global: Global, private apiService: ApiService){
    //Khởi tạo form update password
    this.formPassword = new FormGroup({
      'current': new FormControl(null, Validators.required),
      'new': new FormControl(null, Validators.required),
      'confirm': new FormControl(null, Validators.required),
    });
    //Khởi tạo form edit info
    this.formEdit = new FormGroup({
      'name': new FormControl(this.dataInfo?.name, Validators.required),
      'phone': new FormControl(this.dataInfo?.phone, Validators.required),
      'email': new FormControl(this.dataInfo?.email, [Validators.required, Validators.email]),
      'address': new FormControl(this.dataInfo?.address, Validators.required),
    });
    
  }
  ngOnInit(){

    this.global.currentInfo.subscribe(staff => {
      this.dataInfo = staff[0]
      this.staffProject = staff[0]?.project
      this.formEdit.patchValue({
        'name': this.dataInfo?.name,
        'phone': this.dataInfo?.phone,
        'email': this.dataInfo?.email,
        'address': this.dataInfo?.address,
      });
      //lấy danh sách dự án
      const listProject = Array.from(new Set(staff[0]?.task.map((e:any) => e.nameProject)))
      // format lại danh sách dự án: thêm 1 array detail và trong với detail là danh sách các task đã thực hiện bởi nhân viên
      const formatProject = listProject.map((e:any) => {
        return {
          project:e,
          detail:staff[0]?.task.filter((t:any) => e.includes(t.nameProject)) 
        }
      })
      this.resultProject = formatProject
    })
  }
  //Validate form edit info
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
  // Validate form update password
  onSubmitPassword(){
    const value = this.formPassword.value
    if (this.formPassword.invalid) {
      Object.keys(this.formPassword.controls).forEach(field => {
        const control = this.formPassword.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return
    }
    //Check mật khẩu mới và xác nhận mật khẩu có giống nhau không 
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
  //Cập nhật trạng thái cho form (thay đổi thông tin / cập nhật mật khẩu)
  effectModal(modal:string){
    this.formBoolean[modal] = !this.formBoolean[modal]
  }
  formatDate(date:any){
    return date.split("/").reverse().join("-")
  }
}


