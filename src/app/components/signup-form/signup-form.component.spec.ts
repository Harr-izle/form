import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupFormComponent } from './signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignupFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.signupForm.get('email')?.value).toBe('');
    expect(component.signupForm.get('password')?.value).toBe('');
    expect(component.signupForm.get('confirmPassword')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.signupForm;
    expect(form.valid).toBeFalsy();
    
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('password123');
    
    expect(form.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.signupForm.controls['email'];
    
    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBeTruthy();
    
    emailControl.setValue('valid@email.com');
    expect(emailControl.hasError('email')).toBeFalsy();
  });

  it('should validate password match', () => {
    const form = component.signupForm;
    
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('different');
    
    expect(form.hasError('passwordMismatch')).toBeTruthy();
    
    form.controls['confirmPassword'].setValue('password123');
    expect(form.hasError('passwordMismatch')).toBeFalsy();
  });

  it('should call onSubmit when form is valid', () => {
    spyOn(component, 'onSubmit');
    const form = component.signupForm;
    
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('password123');
    
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
