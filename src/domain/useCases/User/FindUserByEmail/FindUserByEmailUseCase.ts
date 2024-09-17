import { IUserRepository, UserInstanceOptions } from "../../../repositories/IUserRepository";

interface DTO{
  email: string,
  options?: UserInstanceOptions
}
export class FindUserByEmailUseCase{
  constructor(
    private userRepo: IUserRepository
  ){}

  async execute({ email, options } : DTO){
    const user = await this.userRepo.findUserByEmail(email, options)
    return user
  }
}