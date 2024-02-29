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

  forgetForm!: FormGroup;

  title: string = '¿Olvidaste la contraseña?';
  hasError: {[key: string]: any} = {};
  colors: {[key: string]: any} = COLORS;
  showPanel: boolean = true;

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }
  ngOnInit(): void {

    console.info('an-INNFO: Ejecutando ForgetpwdComponent.');

    this.forgetForm = this.fb.group({
      email: this.email(),
    })

  }

  checkForm(): void {

  }

}
