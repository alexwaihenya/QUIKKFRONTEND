import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup
  

  constructor(private fb: FormBuilder, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      // username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  onRegister() {

    const newUser: IUser = { ...this.form.value };
    console.log(newUser);
    let response = this.authService.register(newUser.email, newUser.password);
    
    console.log(response);
    

    this.router.navigate(['login'])


    
  }

}
