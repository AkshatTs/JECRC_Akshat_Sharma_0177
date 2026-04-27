import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-feedback.html',
  styleUrl: './form-feedback.css',
})
export class FormFeedback {
  //Dropdown options
  departments = ['HR', 'Development', 'Design', 'QA'];
  
  //Skills Checkbox
  allSkills = ['Angular', 'React', 'Node', 'Python'];

  //Model for two way binding
  feedback = {
    name: '',
    email: '',
    department: '',
    rating: '',
    comments: '',
    skills: [] as string[]
  };

  //Submit handler
  submitForm(form: NgForm){
    if(form.valid){
      console.log('Feedback Submitted', this.feedback);
      alert(JSON.stringify(this.feedback, null, 2));
      form.resetForm();
      this.feedback.skills = [];
    }
    else{
      alert('Please fill all required fields');
    }
  }

  //Update skills array
  updateSkills(skill: string, isChecked: boolean){
    if(isChecked){
      this.feedback.skills.push(skill);
    }
    else{
      const index = this.feedback.skills.indexOf(skill);
      if(index >=0) this.feedback.skills.splice(index, 1);
    }
  }
}
