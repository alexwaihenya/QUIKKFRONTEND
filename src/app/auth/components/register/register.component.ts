import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup
  

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  onRegister() {

    const newUser: IUser = { ...this.form.value };
    console.log(newUser);

    this.router.navigate(['login'])


    
  }

}
