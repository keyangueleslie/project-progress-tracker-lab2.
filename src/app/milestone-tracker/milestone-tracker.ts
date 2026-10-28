import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Milestone, MilestoneService } from '../milestone.service';

@Component({
  selector: 'app-milestone-tracker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './milestone-tracker.html',
  styleUrl: './milestone-tracker.css'
})
export class MilestoneTracker implements OnInit {
  private milestoneService = inject(MilestoneService);

  milestones = signal<Milestone[]>([]);
  successMessage = signal('');
  loadError = signal('');
  submitError = signal('');
  submitting = signal(false);

  milestoneForm = new FormGroup({
    milestoneName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/)]
    }),
    dueDate: new FormControl(''),
    status: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    details: new FormGroup({
      owner: new FormControl(''),
      notes: new FormControl('')
    })
  });

  ngOnInit(): void {
    this.milestoneService.getMilestones().subscribe({
      next: (records) => {
        this.milestones.set(records);
      },
      error: () => {
        this.loadError.set(
          'Unable to load milestones. Check that Express is running.'
        );
      }
    });
  }

  onSubmit(): void {
    this.successMessage.set('');
    this.submitError.set('');

    if (this.milestoneForm.invalid) {
      this.milestoneForm.markAllAsTouched();
      return;
    }

    if (this.submitting()) {
      return;
    }

    const milestone: Milestone = {
      milestoneName:
        this.milestoneForm.controls.milestoneName.value.trim(),
      status: this.milestoneForm.controls.status.value
    };

    this.submitting.set(true);

    this.milestoneService.addMilestone(milestone).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
        this.submitting.set(false);
      },
      error: () => {
        this.submitError.set(
          'Submission failed. Check that Express is running.'
        );
        this.submitting.set(false);
      }
    });
  }
}