import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.css'
})
export class ModalContentComponent {

  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  close() {
    this.activeModal.dismiss('Cross click');
}

  navigateToList() {
    this.router.navigate(['/workouts']);
    this.activeModal.dismiss();
  }
}
