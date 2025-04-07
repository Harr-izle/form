import { Component } from '@angular/core';
import { InputComponent } from "../../shared/input/input.component";
import { FormGroup, ReactiveFormsModule, Validators,FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [InputComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit (){
    if(this.loginForm.valid){
      console.log("Form Submitted", this.loginForm.value)
      this.loginForm.reset();
    }
    else{
      console.log("Form is invalid")
    }
  }
}
