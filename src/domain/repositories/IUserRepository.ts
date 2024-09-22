import { IUser, User } from "../entities/User"

export interface UserInstanceOptions{ include: Array<'password'> }
export interface IUserRepository{
  findUserByEmail(email: string, options?: UserInstanceOptions) : Promise<User | undefined>
  findUserById(id: string, options?: UserInstanceOptions) : Promise<User>
  createUser(user: Omit<IUser, 'id'>, options?: UserInstanceOptions) : Promise<User>
}