import { Component } from '@angular/core';
import { ProgressNotes } from './progress-notes/progress-notes';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressNotes, MilestoneTracker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}