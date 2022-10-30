import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  accountErrorMessage!: string;

  constructor(private fb: FormBuilder, private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

  }

  Login() {

    const loginUser: LoginDetails = { ...this.form.value };
    console.log(loginUser);
    
    let response = this.authService.loging(loginUser.email, loginUser.password);
  
    
    console.log(response);

    // this.router.navigate(['dashboard'])


  }

}
