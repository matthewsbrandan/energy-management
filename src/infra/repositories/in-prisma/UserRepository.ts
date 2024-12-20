import { IUser, User } from "../../../domain/entities/User";
import { IUserRepository, UserInstanceOptions } from "../../../domain/repositories/IUserRepository";
import { prisma as db } from "../../config/prisma";

export class UserRepository implements IUserRepository{
  private _instance(response: any, options?: UserInstanceOptions){
    const user = new User(response, response.id ?? undefined)
    if(!options || !options.include.includes('password')) delete user.password
    
    return user
  }
  async findUserByEmail(email: string, options?: UserInstanceOptions): Promise<User | undefined> {   
    const user = await db.user.findUnique({
      where: { email }
    });

    if(!user) return;
    
    return this._instance(user, options)
  }
  async findUserById(id: string, options?: UserInstanceOptions) : Promise<User> {
    const user = await db.user.findUnique({
      where: { id }
    })

    if(!user) throw new Error('Usuário não encontrado')

    return this._instance(user, options)
  }
  async createUser(user: Omit<IUser, 'id'>, options?: UserInstanceOptions): Promise<User> {
    if(!!await this.findUserByEmail(user.email)) throw new Error(
      'Este email já está sendo utilizado'
    )

    const userCreated = await db.user.create({
      data: user
    })

    return this._instance(userCreated, options)
  }
  async update(id: string, data: Partial<IUser>): Promise<User> {
    try{
      const user = await db.user.update({
        where: { id },
        data
      })

      return this._instance(user);
    }catch(e){
      throw new Error('Não foi possível atualizar o seu usuário')
    }
  }
}