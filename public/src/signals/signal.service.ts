/**
 * Configuración Signal para aplicación.
 */

import { InjectionToken, Injectable, inject, signal, Signal, computed } from '@angular/core';


// Interfaces o types.

export interface User {
  id: string,
  forgetPassword: string,
}


// Stores.

export const USER_STORE = new InjectionToken('USER_STORE', {
  factory: () => (inject(SignalService<User>))
});


// Servicio.

@Injectable({
  providedIn: 'root'
})
export class SignalService<T> {
  
  readonly state = signal<T>({} as T);

  constructor(){}

  /**
   * @description Retorna todo el Store.
   * @returns Signal Store.
   */
  get(): T {
    return this.state();
  }

  /**
   * @description Configuro todo el Store.
   * @param state 
   */
  set(state: T) {
    this.state.set(state);
  }

  /**
   * @description Retorna el valor de una clave del Store.
   * @param key 
   * @returns Signal value.
   */
  select<k extends keyof T>(key: k): Signal<T[k]> {
    return computed(() => this.state()[key]);
  }

  /**
   * @description Actualizo una de las claves del Store.
   * @param key 
   * @param data 
   */
  updateKey<K extends keyof T>(key: K, data: T[K]) {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  /**
   * @description Actualizo parte del Store.
   * @param partialValue
   */
  update(partialValue: Partial<T>) {
    this.state.update((currentValue) => ({...currentValue, ...partialValue}));
  }

}