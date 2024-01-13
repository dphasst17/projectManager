import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  fetchProject = () => {
    return fetch('https://my-api.com/project').then(res => res.json());
  }
}
