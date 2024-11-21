/**
 * Servicio de Project. Gestión CRUD...
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from 'src/user/user.entity';
import { Project } from './project.entity';
import { ProjectInput } from 'src/dto/project.input';
import { UserProjects } from 'src/dto/user-projects.args';


@Injectable()
export class ProjectService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  /**
   * @description Añade un proyecto a un usuario.
   * @param projectInput 
   * @returns Promise<Project>
   */
  async addProject( projectInput: ProjectInput ): Promise<Project> {

    const addProject = new this.projectModel(projectInput);
    return await addProject.save();
  
  }

  /**
   * @description Lista todos los proyectos almacenados.
   * @returns Promise<Project[]>
   */
  async findAllProject(): Promise<Project[]> {

    return await this.projectModel.find().exec();

  }

  /**
   * @description Lista los prpjectos de un usuario.
   * @param id String
   * @returns Promise<Project[]>
   */
  async userProjects(id: string): Promise<Project[]> {

    return await this.projectModel.find({user: id}).populate('user').exec()

  }

}