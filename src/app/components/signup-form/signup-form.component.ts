import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.sass'
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(){
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      // Perform the signup operation here
      this.signupForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
