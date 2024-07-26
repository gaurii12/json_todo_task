import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatLabel,
    ReactiveFormsModule,
    SuccessDialogComponent,
    MatDialogModule
    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginSuccess: boolean = false;
  showPassword: boolean = false;
  showEyeIcon: boolean = false;

  LoginForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ])
  });

  constructor(private router: Router,private dialog:MatDialog) {}

  

  logIn(): void {
    if (this.LoginForm.valid) {
      const formValues = this.LoginForm.value;
      if (formValues.Email === 'gauri@gmail.com' && formValues.Password === '1111') {
        this.loginSuccess = true;
        this.openSuccessDialog();
        // alert('Login successfully.');
        this.router.navigate(['json']);
      } else {
        this.loginSuccess = false;
        alert('Please enter valid data.');
      }
    } else {
      this.loginSuccess = false;
      alert('Please enter valid data.');
    }

    this.LoginForm.reset();
  }

  openSuccessDialog() {
    this.dialog.open(SuccessDialogComponent);
  }

  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordInput() {
    const passwordValue = this.LoginForm.controls['Password'].value;
    if (passwordValue !== null) {
      this.showEyeIcon = passwordValue.length > 0;
    } else {
      this.showEyeIcon = false;
    }
  }
}
