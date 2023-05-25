import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  get firstName() {
    return this.formUser.get('firstName') as FormControl;
  }
  get lastName() {
    return this.formUser.get('lastName') as FormControl;
  }
  get email() {
    return this.formUser.get('email') as FormControl;
  }

  formUser = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private http: HttpClient) {}

  submitForm() {
    console.log('submit');
    const user = JSON.stringify(this.formUser.value);
    this.http
      .post('http://localhost:3000/api/users', user, {
        headers: { 'content-type': 'application/json' },
      })
      .subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.formUser.reset();
        },
        error: (error) => {
          console.error('Error creating user:', error.message);
        },
      });
  }
}
