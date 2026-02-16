import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent implements OnInit {
  registerObj = {
    fullName: '',
    email: '',
    password: '',
    role: 'USER'
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerObj.fullName && this.registerObj.email && this.registerObj.password) {
      console.log('Registering:', this.registerObj);
      this.auth.register(this.registerObj).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Registration failed. Node might already exist.');
        }
      });
    } else {
      alert('Please initialize all required protocol fields.');
    }
  }
}
