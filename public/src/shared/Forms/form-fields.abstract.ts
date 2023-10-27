/**
 * @description Validadores para los distintas entradas que nos podemos encontrar en un formulario.
 * @version 0.0
 */

import { FormGroup, FormControl, Validators } from '@angular/forms';

export abstract class FormFieldsAbstract {

  /**
   * @description Email validator.
   * @returns FormControl validator
   */
  email(): FormControl {
    return new FormControl ('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.email,
        Validators.maxLength(40)
      ]
    });
  }

  /**
   * @description Password validator.
   * @returns FormControl validator
   */
  password(): FormControl {
    return new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    });
  }

  /**
   * @description Required fields validator.
   * @returns FormControl validator
   */
  required(): FormControl {
    return new FormControl ('', {
      nonNullable: true,
      validators: [ 
        Validators.required
      ]
    });
  }

}