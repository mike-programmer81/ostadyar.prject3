import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
    RadioButtonModule,
    CommonModule
  ],
  providers: [MessageService],
  template: `
    <div class="min-h-screen bg-gray-50 flex justify-center items-center p-4">

      <div class="w-full max-w-md">
        <p-card>

          <h2 class="text-center text-2xl font-bold mb-4">ورود به سیستم</h2>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">

            <div>
              <label class="block mb-1">نام کاربری</label>
              <input pInputText class="w-full"
                formControlName="username" />
            </div>

            <div>
              <label class="block mb-1">رمز عبور</label>
              <input type="password" pInputText class="w-full"
                formControlName="password" />
            </div>

            <!-- نقش -->
            <div class="mt-4">
              <label class="block font-medium mb-2">نقش کاربر:</label>

              <div class="flex gap-4 items-center">
                <p-radioButton 
                  name="role" 
                  value="student"
                  formControlName="role" 
                  inputId="student">
                </p-radioButton>
                <label for="student">دانش‌آموز</label>

                <p-radioButton 
                  name="role" 
                  value="teacher"
                  formControlName="role" 
                  inputId="teacher">
                </p-radioButton>
                <label for="teacher">معلم</label>
              </div>
            </div>

            <button pButton 
              type="submit" 
              label="ورود" 
              class="w-full"
              [loading]="loading">
            </button>

          </form>

        </p-card>
      </div>

      <p-toast></p-toast>
    </div>
  `
})
export class LoginPage {

  loginForm: FormGroup;
  loading = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private auth = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['student', Validators.required]  // پیش‌فرض
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    const { username, password, role } = this.loginForm.value;

    this.auth.login(username, password, role).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: err?.error || 'نام کاربری یا رمز عبور اشتباه است'
        });
      }
    });
  }
}









