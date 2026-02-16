import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login(this.loginObj).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard']);
    });
  }
}
