import { IUserRepository } from "../../../repositories/IUserRepository";
import bcrypt from 'bcrypt';

interface DTO{
  name: string,
  email: string,
  password: string,
  avatar?: string,
  home_ip?: string
}
export class CreateUserUseCase{
  constructor(
    private userRepo: IUserRepository
  ){}

  async execute({ name, email, password, avatar, home_ip }:DTO){
    const error = [
      [!name, 'É obrigatório preencher o nome'],
      [!email, 'É obrigatório preencher o email'],
      [!password, 'É obrigatório preencher a senha'],
    ].find(([hasError]) => hasError)?.[1] as string | undefined;

    if(error) throw new Error(error);

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.userRepo.createUser({
      name, email, password: hashedPassword, avatar, home_ip
    })

    return user
  }
}