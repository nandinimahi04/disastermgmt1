import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class RegisterComponent {
  email = '';
  password = '';
  role = 'USER';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({ email: this.email, password: this.password, role: this.role })
      .subscribe(() => this.router.navigate(['']));
  }
}