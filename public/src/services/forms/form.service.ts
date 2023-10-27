import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor() {}

  /**
   * @description Obtiene el nombre del campo del formulario con error y lo asigna a
   * un objeto con valor true.
   * @param form FormGroup
   * @returns Object
   */
  hasFieldError(form: FormGroup): object {

    return Object.keys(form.controls)
      .filter(value => !!form.controls[value].errors)
      .reduce((o, key) => ({ ...o, [key]: true }), {});

  }
}
