/**
 * @description Comprueba si Password y Confirmar Password son iguales.
 * @param ac AbstractControl
 */

import  { AbstractControl, FormGroup } from '@angular/forms';


export class ConfirmPasswordValidator {

  static confirmPassword( ac: AbstractControl): void {
    
    const pwd = ac.get('password')?.value;
    const cPwd = ac.get('confirmPassword')?.value;
  
    ( pwd !== cPwd )
    ? ac.get('confirmPassword')?.setErrors({ confirmPassword: true })
    : null
    
  }

}
