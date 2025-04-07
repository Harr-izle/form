import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputComponent } from "../../shared/input/input.component";

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.sass'
})
export class SignupFormComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  passwordMatch: boolean | null = null;
  private passwordSubscription?: Subscription;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]]
    }, { validators: this.passwordMatchValidator });

   
    this.passwordSubscription = this.signupForm.get('confirmPassword')?.valueChanges.subscribe(value => {
      const password = this.signupForm.get('password')?.value;
      this.passwordMatch = value === password;
    });
  }

  ngOnDestroy() {
    this.passwordSubscription?.unsubscribe();
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(){
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);

      this.signupForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
