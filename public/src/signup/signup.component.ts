import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Apollo } from 'apollo-angular';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component'; 
import { FormService } from 'src/services/forms/form.service';
import { colors } from 'src/config/config.service';
import { ConfirmPasswordValidator } from 'src/shared/Forms/validators/confirm-password.validator';
import { SignupService } from './signup.service';
import { user } from 'src/shared/signals/user.signal';
import { Unsubscribe } from 'src/decorators/unsubscribe.decorator';


@Component({
  selector: 'an-todo-signup',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    CardSessionComponent    
  ],
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.scss']
})
@Unsubscribe()
export class SignupComponent extends FormFieldsAbstract implements OnInit {

  signupForm!: FormGroup;
  subscription$: Subscription = new Subscription();

  title: string = 'Regístrate';
  hasError: {[key: string]: any} = {};
  colors: {[key: string]: any} = colors; 

  constructor(
    private fb:FormBuilder,
    private formService:FormService,
    private apollo: Apollo,
    private signupService: SignupService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {

    console.info('an-INFO: Ejecutando SignupComponent.');

    this.signupForm = this.fb.group({
      firstName: this.firstName(),
      lastName: this.lastName(),
      nickName: this.nickName(),
      email: this.email(),
      password: this.password(),
      confirmPassword: this.password(),
    }, {
      validator: ConfirmPasswordValidator.confirmPassword
    });

  }

  checkForm(): void {

    this.hasError = this.formService.hasFieldError(this.signupForm);

    if ( Object.keys(this.hasError).length === 0 ) {
      this.subscription$ = this.signupService
        .createUser$({
          firstName: this.signupForm.value.firstName,
          lastName: this.signupForm.value.lastName,
          email: this.signupForm.value.email,
          nickName: this.signupForm.value.nickName,
          password: this.signupForm.value.password
        })
        .pipe(map(result => result.data.createUser))
        .subscribe({
          next: (createUser) => {
            user.set(createUser.access_token);
            this.router.navigate(['/dashboard'])
          },
          error: (err) => {
            Object
              .keys(err.graphQLErrors)
              .filter(element => {
                const { originalError } = err.graphQLErrors[element];
                if ( originalError.statusCode === 400 || originalError.statusCode === 401 || originalError.statusCode === 406) {
                  Object
                    .keys(this.signupForm.controls)
                    .filter(value => this.signupForm.controls[value].setValue(''));
                  this.hasError = this.formService.hasFormError(this.signupForm);
                }
              });
          }
        });
    }

  }

}
