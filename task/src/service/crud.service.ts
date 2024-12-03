/**
 * Servicio para consultas a la base de datos.
 */

import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';


export class CrudService<T> {
  
  constructor( private model: Model<T>) {}

  /**
   * @description Muestra todos los documentos de un modelo.
   * @returns Promise<T[]>
   */
  async getModels(): Promise<T[]> {

    return await this.model.find().exec();

  }

  /**
   * @description Busca un documento por una propiedad de un modelo.
   * @param data
   * @returns Promise<T[]>
   */
  async getModel(key: Partial<T>): Promise<T[]> {

    return await this.model.find(key).exec();

  }

  /**
   * @description Muestra todos los documentos por una propiedad de un modelo y puebla esos documentos.
   * @param key 
   * @param pplt 
   * @returns Promise<T[]>
   */
  async getModelPopulate(key: Partial<T>, pplt: string): Promise<T[]> {

    return await this.model.find(key).populate(pplt).exec();

  }

  /**
   * @description Añado un documento al modelo.
   * @param key 
   * @returns Promise<T>
   */
  async setModel(key: Partial<T>): Promise<T> {

    return await this.model.create(key);

  }
}
