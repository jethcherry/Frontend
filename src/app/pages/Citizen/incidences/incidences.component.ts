import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutUsComponent } from '../about-us/about-us.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../States';
import { IncidentAction } from '../../../States/Actions/incident.action';
import { Observable } from 'rxjs';
import { Incidence } from '../../../Models/Incidence';
import { selectAllIncidences } from '../../../States/Selectors/incident.selector';

@Component({
  selector: 'app-incidences',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,AboutUsComponent],
  templateUrl: './incidences.component.html',
  styleUrl: './incidences.component.css'
})
export class IncidencesComponent  implements OnInit{

  form!:FormGroup
  incidences$: Observable<Incidence[]>

  constructor(private store:Store< AppState>,private fb:FormBuilder){
    this.store.subscribe(state=>{
      console.log(state)
    })
    this.incidences$ = this.store.pipe(select(selectAllIncidences));
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      Image:[null],
      Title:['',Validators.required],
      Location:[''],
      Description:['',Validators.required],
      Date:['',Validators.required],
      Author:['',Validators.required]
    })   
  }
  

  onSubmit(){
    this.store.dispatch(IncidentAction.add({newIncidence:this.form.value}))
}

}

