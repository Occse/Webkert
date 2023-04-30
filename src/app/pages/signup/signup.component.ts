import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  signUpForm = new FormGroup({
    email: new FormControl('',{nonNullable: true}),
    password: new FormControl('',{nonNullable: true}),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      const user: User ={
        id:cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('email')?.value.split('@')[0] as string,
        name:{
          firstname:this.signUpForm.get('name.firstname')?.value as string,
          lastname:this.signUpForm.get('name.lastname')?.value as string
        }
      };
      this.userService.create(user).then(_ => {
        this.router.navigateByUrl('/main');
        console.log('User added successfully.');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  goBack() {
    this.location.back();
  }

}
