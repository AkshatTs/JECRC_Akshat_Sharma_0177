import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormControl,
  FormRecord,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  //FormControl (single field)
  name = new FormControl('', Validators.required);

  //FormGroup (structured data)
  account = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  //FormArray (dynamic list)
  skills = new FormArray([
    new FormControl('Angular')
  ]);

  //FormRecord (dynamic objects)
  preferences = new FormRecord({
    darkMode: new FormControl(true),
    notifications: new FormControl(false)
  });

  //Add skill
  addSkill(){
    this.skills.push(new FormControl(''));
  }

  //Remove skill
  removeSkill(i: number){
    this.skills.removeAt(i);
  }

  //Add preference
  addPreference(){
    const key = 'pref_' + Object.keys(this.preferences.controls).length;
    this.preferences.addControl(key, new FormControl(false));
  }

  //Submit
  submit(){
    const data = {
      name: this.name.value,
      account: this.account.value,
      skills: this.skills.value,
      preferences: this.preferences.value
    };
    console.log('Employee Data', data);
    alert(JSON.stringify(data, null, 2));
  }
}
