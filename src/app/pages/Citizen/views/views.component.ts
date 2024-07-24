import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './views.component.html',
  styleUrl: './views.component.css'
})
export class ViewsComponent implements  OnInit {

  form!:FormGroup
  error!:string
  message!:string

  ngOnInit(): void {
      
  }

  onSubmit(){
    
  }

}
