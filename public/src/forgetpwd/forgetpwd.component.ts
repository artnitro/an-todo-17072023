/**
 * Componente Forget Passwword.
 */

import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component';
import { COLORS } from 'src/shared/config';
import { ConfirmPasswordValidator } from 'src/shared/Forms/validators/confirm-password.validator';


@Component({
  selector: 'an-todo-forgetpwd',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    CardSessionComponent,
  ],
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.scss']
})
export class ForgetpwdComponent extends FormFieldsAbstract implements OnInit {

  forgetEmailForm!: FormGroup;
  // forgetPasswordForm!: FormGroup; //// Poner para el nuevo formulario del password.

  title: string = '¿Olvidaste la contraseña?';
  hasEmailError: {[key: string]: any} = {};
  colors: {[key: string]: any} = COLORS;
  showEmail: boolean = true;
  showPanel: boolean = false;
  showPassword: boolean = false;
  showSend: boolean = true;

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }
  ngOnInit(): void {

    console.info('an-INNFO: Ejecutando ForgetpwdComponent.');

    this.forgetEmailForm = this.fb.group({
      email: this.email(),
    });

  }

  checkForm(): void {

  }

}
