import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../Services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  fb = inject(FormBuilder);
  userServices = inject(User);
  router = inject(Router);
  signUpForm!: FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        cmfpassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validation: this.passwordMatching,
      }
    );
  }
  passwordMatching(fg: FormGroup) {
    return fg.get('password')?.value === fg.get('cmfpassword')?.value
      ? null
      : { passwordMisMatch: true };
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      this.userServices.register(this.signUpForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/transaction']);
        },
      });
    }
  }
}
