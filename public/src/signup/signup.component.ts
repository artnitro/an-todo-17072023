import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component'; 
import { FormService } from 'src/services/forms/form.service';
import { COLORS } from 'src/shared/config';
import { ConfirmPasswordValidator } from 'src/shared/Forms/validators/confirm-password.validator';

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
export class SignupComponent extends FormFieldsAbstract implements OnInit {

  signupForm!: FormGroup;

  title: string = 'Regístrate';
  hasError: {[key: string]: any} = {};
  colors: {[key: string]: any} = COLORS; 

  constructor(
    private fb:FormBuilder,
    private formService:FormService,
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

    console.log('an-LOG: Elementos del formulario con error: ', this.hasError);

  }

}
