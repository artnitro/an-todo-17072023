/**
 * signal para el usuario.
 */

import { WritableSignal, signal } from '@angular/core';

export const user: WritableSignal<string> = signal('ok');