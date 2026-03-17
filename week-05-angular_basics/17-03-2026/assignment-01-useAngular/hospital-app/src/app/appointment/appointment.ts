import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment {

  patientName = '';
  doctor = '';
  date = '';
  consultationType = '';
  symptoms = '';

  fee = 0;
  submitted = false;

  doctors = ['Dr. Sharma', 'Dr. Mangal', 'Dr. Bharadwaj'];

  today = new Date().toISOString().split('T')[0];

  updateFee() {
    this.fee = this.consultationType === 'Online' ? 300 : 500;
  }

  submitForm() {
    this.submitted = true;
  }
}