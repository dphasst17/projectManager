import { Component, Input, OnInit,EventEmitter,Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Global } from '../../../service/global.service';
import { ApiService } from '../../../api/api.service';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  @Input() data:any;
  @Output() detailChange = new EventEmitter<boolean>();
  constructor(private global:Global, private apiService: ApiService){}
  staff:any = []
  ngOnInit(): void {
  }

  formatDate(date:any){
    return date.split("/").reverse().join("-")
  }
}
