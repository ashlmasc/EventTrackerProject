import { Component } from '@angular/core';
import { WorkoutLogService } from '../../services/workout-log.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modal-content/modal-content.component';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-workout-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-add.component.html',
  styleUrl: './workout-add.component.css'
})
export class WorkoutAddComponent {

  workout: any = {}; // Prepares an object to store the form data

  constructor(private workoutLogService: WorkoutLogService,  private modalService: NgbModal, private navigationService: NavigationService) {}

  onSubmit(form: NgForm): void {
    this.workout.duration = this.convertDurationToSeconds(this.workout.durationDisplay);
    if (form.valid) {
      this.workoutLogService.createWorkout(this.workout).subscribe({
        next: () => {
          // Open the modal with the correct component-- ie THIS one
          this.openModal();  // Call the method to open the modal
        },
        error: (err) => console.error('Error adding workout:', err)
      });
    }
  }

  convertDurationToSeconds(duration: string): number {
    const parts = duration.split(':');
    return parts.length === 2 ? parseInt(parts[0]) * 60 + parseInt(parts[1]) : 0;
  }

  convertSecondsToDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }

openModal() {
  const modalRef = this.modalService.open(ModalContentComponent);
  modalRef.result.then((result) => {
    console.log('Closed with:', result);
  }, (reason) => {
    console.log('Dismissed with:', reason);
  });
}
navigateToList(): void {
  this.navigationService.navigateToList();  // Use the navigation service
}
}