import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-progress-notes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './progress-notes.html',
  styleUrl: './progress-notes.css'
})
export class ProgressNotes {
  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl('On Track'),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });

  projectCodeMessage = '';

  private readonly projectNames: Record<string, string> = {
    PPT101: 'Project Progress Tracker',
    WEB202: 'Website Redesign',
    APP303: 'Mobile Application Development',
    DATA404: 'Data Analytics Dashboard'
  };

  onProjectCodeBlur(): void {
    const code = (
      this.progressNotesForm.controls.projectCode.value ?? ''
    ).trim().toUpperCase();

    const projectName = this.projectNames[code];

    this.progressNotesForm.controls.projectName.setValue(
      projectName ?? ''
    );

    this.projectCodeMessage =
      code && !projectName ? 'Project code not found.' : '';
  }
}