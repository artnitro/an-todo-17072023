/**
 * Decorador para unsubscribe observables.
 */

import { OnDestroy } from '@angular/core';


export const Unsubscribe = () => {

  return ( constructor: Function ) => {

    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function(): void {
      for (const prop in this) {
        const property = this[prop];
        if (property && typeof property.unsubscribe === 'function') {
          property.unsubscribe();
        }
      } 
      original?.apply(this, arguments);
    
    };

  }

}
