import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /* All fetch project */
  startServer = async() => {
    return fetch(`${environment.apiUrl}/`).then(res => res.json());
  }
  fetchCreateUser = async(data:any,token:string) => {
    return fetch(`${environment.apiUrl}/auth/register`,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify(data)
    }).then(res => res.json());
  }

  fetchProjectById = async(id:any) => {
    return fetch(`${environment.apiUrl}/api/project/id/${id}`).then(res => res.json());
  }

  fetchExpense = async() => {
    return fetch(`${environment.apiUrl}/api/project/expense`).then(res => res.json())
  }

  fetchAutoUpdateStatus = async() => {
    return fetch(`${environment.apiUrl}/api/project/update/status/auto`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res => res.json())
  }

  fetchProject = async() => {
    return fetch(`${environment.apiUrl}/api/project`).then(res => res.json());
  }
  
  fetchCreateProject = async (data:any) => {
    return fetch(`${environment.apiUrl}/api/project/create`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
  }
  fetchCreateTask = async (idProject:any,detail:any[]) => {
    return fetch(`${environment.apiUrl}/api/project/create/task`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({idProject,detail})
    }).then(res => res.json())
  }

  fetchProjectByStaff = async(token:string) => {
    return fetch(`${environment.apiUrl}/api/project/staff`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then(res => res.json());
  }

  fetchProjectByStatus = async(status:string) => {
    return fetch(`${environment.apiUrl}/api/project/status/${status}`).then(res => res.json())
  }

  fetchTaskTodo = async(token:string) => {
    return fetch(`${environment.apiUrl}/api/project/task/todo`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then(res => res.json())
  }
  fetchTaskTodoByStaff = async(token:string) => {
    return fetch(`${environment.apiUrl}/api/project/task/todo/staff`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then(res => res.json())
  }
  fetchUpdateProject = async(id:number,data:any) => {
    return fetch(`${environment.apiUrl}/api/project/`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({idProject:id,detail:data})
    }).then(res => res.json())
  }
  fetchConfirmTask = async(idTask:number,obj:any) => {
    return fetch(`${environment.apiUrl}/api/project/task/update`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({idTask:idTask,object:obj})
    }).then(res => res.json())
  }
  fetchTaskByStatus = async(status:string) => {
    return fetch(`${environment.apiUrl}/api/project/task/status/${status}`).then(res => res.json())
  }
  fetchDeleteProject = async(idProject:number) => {
    return fetch(`${environment.apiUrl}/api/project/`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({idProject:idProject})
    }).then(res => res.json())
  }
  /* All fetch auth */

  fetchLogin = async(data:any) => {
    return fetch(`${environment.apiUrl}/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
  }

  fetchForgotPassword = async(data:any) => {
    return fetch(`${environment.apiUrl}/auth/forgot`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
  }
  fetchUpdatePassword = async(token:string,data:any) => {
    return fetch(`${environment.apiUrl}/auth/password`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
  }
  /* All fetch user */

  fetchInfo = async(token:any) => {
    return fetch(`${environment.apiUrl}/user/info`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then(res => res.json())
  }
  fetchUpdateUser = async(token:string,data:any) => {
    return fetch(`${environment.apiUrl}/user/update`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
  }
  fetchStaff = async() => {
    return fetch(`${environment.apiUrl}/user/staff`).then(res => res.json())
  }
  fetchUpdateAction = async(token:string,data:any) => {
    return fetch(`${environment.apiUrl}/user/update/action`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
  }
  
}
