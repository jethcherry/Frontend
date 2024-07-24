import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidence,IncidenceResponse } from '../Models/Incidence'; 

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private readonly baseURL = 'http://localhost:5500/incidents/';

  constructor(private http: HttpClient) { }

  // Add a new incident
  addIncident(newIncidence: Incidence): Observable<IncidenceResponse> {
    return this.http.post<IncidenceResponse>(`${this.baseURL}add`, newIncidence);
  }

  // Get a single incident by ID
  getIncident(incidenceId: string): Observable<Incidence> {
    return this.http.get<Incidence>(`${this.baseURL}${incidenceId}`);
  }

  // Get all incidents
  getAllIncidents(): Observable<Incidence[]> {
    return this.http.get<Incidence[]>(`${this.baseURL}`);
  }

  // Update an existing incident
  updateIncident(updatedIncidence: Incidence): Observable<IncidenceResponse> {
    return this.http.put<IncidenceResponse>(`${this.baseURL}update/${updatedIncidence.IncidenceId}`, updatedIncidence);
  }

  // Delete an incident by ID
  deleteIncident(incidenceId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}delete/${incidenceId}`);
  }

  // Get incidents by user ID
  getUserIncidents(userId: string): Observable<Incidence[]> {
    return this.http.get<Incidence[]>(`${this.baseURL}user/${userId}`);
  }
}
