import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  accountErrorMessage!: string;

  constructor(private router: Router) {}

  // async mapAuthCodeToMessage(authCode) {
  //   switch (authCode) {
  //     case "auth/invalid-password":
  //       return "Password provided is not corrected";

  //     case "auth/invalid-email":
  //       return "Email provided is invalid";

  //     // Many more authCode mapping here...

  //     default:
  //       return "";
  //   }
  // }

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      return error;
    }
  }

  async loging(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password).then(() => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
      });
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/wrong-password':
        case 'auth/user-not-found': {
          this.accountErrorMessage = 'Wrong email address or password.';
          break;
        }
        default: {
          this.accountErrorMessage = 'Unexpected Error';
          break;
        }
      }
      console.log(error.code);
      console.log(error.message);
      this.router.navigate(['login']);
      return error;
    }
  }

  async logout() {
    try {
      await this.auth.signOut().then((res) => {
       console.log(res);
       
        localStorage.removeItem('token');
        this.router.navigate([' ']);
      });
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      return error;
    }
  }
}
