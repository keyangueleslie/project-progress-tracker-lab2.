import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Milestone {
  milestoneName: string;
  status: string;
}

export interface MilestoneResponse {
  message: string;
  milestone: Milestone;
}

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/milestones';

  getMilestones(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.apiUrl);
  }

  addMilestone(milestone: Milestone): Observable<MilestoneResponse> {
    return this.http.post<MilestoneResponse>(this.apiUrl, milestone);
  }
}