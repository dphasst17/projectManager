import { Component, OnInit } from '@angular/core';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder,Validators,ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  constructor(private global:Global,private apiService:ApiService,private fb: FormBuilder){
  }
  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm: ['', [Validators.required, Validators.minLength(8)]],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    position: ['', Validators.required],
  });
  
  createForm:boolean = false;
  project:any = []
  staff:any = []
  taskToDo:any = []
  pageTask:any = []
  currentTaskTodo:any = []
  activePageTask:number = 1
  pageProject:any = []
  actionEdit:boolean = false
  userEdit:string = ''
  ngOnInit(): void {
    this.global.currentProject.subscribe(p => this.project = p)
    this.global.currentStaff.subscribe(s => this.staff = s)
    this.apiService.fetchTaskTodo(this.global.token).then(res => {
      if(res.status === 200){
        this.pageTask = this.global.pagination(res.data.length,4)
        const result = this.global.calculatorPage(4,this.activePageTask)
        this.taskToDo = res.data
        this.currentTaskTodo = res.data.slice(result - 4,result)
      }else{
        console.log(res.message)
      }
    })
  }
  changeActivePages(newPages:number){
    this.activePageTask = newPages
    const result = this.global.calculatorPage(4,newPages)
    this.currentTaskTodo = this.taskToDo.slice(result-4,result)
  }
  changeCreateForm(){
    this.createForm = !this.createForm
  }
  resetForm() {
    this.userForm.reset();
  }
  handleAddNewUser() {
    let formValues = this.userForm.value;
    let allFieldsFilled = Object.values(formValues).every(value => value !== null && value !== '');

    if(formValues.confirm !== formValues.password){
      alert('Confirm password does not match with password')
      return
    }
    if (allFieldsFilled) {
      const result = {
        username:formValues.username,
        password:formValues.password,
        name:formValues.name,
        email:formValues.email,
        role:formValues.role,
        position:formValues.position
      }
      const newResult = {
        idUser:formValues.username,
        name:formValues.name,
        email:formValues.email,
        role:formValues.role,
        position:formValues.position,
        area:'None'
      }
      const token = this.global.token
      this.apiService.fetchCreateUser(result,token).then(res => {
        if(res.status === 201){
          this.resetForm()
          this.changeCreateForm()
          this.staff = [...this.staff,newResult]
          alert(res.message)
        }else{
          alert(res.message)
        }
      })
    }

  }
  editActionUser(user:string) {
    if(this.userEdit !== ''){
      this.userEdit !== user ? (this.userEdit = user) : (this.userEdit = '',this.actionEdit = !this.actionEdit)
    }else{
      this.actionEdit = !this.actionEdit
      this.userEdit = user
    }
  }
  changeAction(currentAction:string,idUser:string){
    const newAction = (<HTMLInputElement>document.getElementById('newAction')).value
    if(newAction !== currentAction){
      this.apiService.fetchUpdateAction(this.global.token,{idUser:idUser,action:newAction})
      .then(res => {
        if(res.status === 200){
          this.staff = this.staff.map((e:any) => {
            return {
              ...e,
              action:e.idUser === idUser ? newAction : e.action
            }
          })
          this.actionEdit = !this.actionEdit
          this.userEdit = ''
        }
        alert(res.message)
      })
    }else{
      this.actionEdit = !this.actionEdit
      this.userEdit = ''
    }
  }
}
