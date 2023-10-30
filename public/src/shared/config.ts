/**
 * Variables globales de configuración de la aplicación.
 */


import { Icolors, Iservices } from "./interfaces/config.interface";

/**
 * Colores.
 */

export const COLORS: Icolors = {
  red: 'rgb(225 29 72)'
}

/**
 * Servicios.
 */

export const SERVICES: Iservices = {
  api: 'https://api.antodo.local:3000/api/v1/',
  oauth: 'https://oauth.antodo.local:5000/oauth/v1/'
}

