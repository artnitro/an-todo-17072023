import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component'; 
import { FormService } from 'src/services/forms/form.service';
import { COLORS } from 'src/shared/config';

@Component({
  selector: 'an-todo-signin',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    CardSessionComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends FormFieldsAbstract implements OnInit {

  signinForm!: FormGroup;

  title: string = 'Iniciar sesión';
  hasError: {[key: string]: any} = {};
  colors: {[key: string]: any} = COLORS; 
    
  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) {
    super();
  }

  ngOnInit(): void {

    console.info('an-INFO: Ejecutando SigninComponent.');

    this.signinForm = this.fb.group({
      email: this.email(),
      password: this.password(),
    });

  }

  checkForm(): void {

    this.hasError = this.formService.hasFieldError(this.signinForm);

    console.log('an-LOG: Elementos del formulario con error: ', this.hasError);

  }

}
