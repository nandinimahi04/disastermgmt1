import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  
   constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard']);
});
}
}
