import { User } from "../../../entities/User"
import { IDeviceRepository } from "../../../repositories/IDeviceRepository"

interface DTO{
  user: User
}
export class ProfileUseCase{
  constructor(
    private deviceRepo: IDeviceRepository
  ){}

  async execute({ user }:DTO){
    const conecteds = await this.deviceRepo.count({
      user_id: user.id
    })

    const actives = await this.deviceRepo.count({
      user_id: user.id,
      status: 'ativo'
    })

    let monitoring = 0;
    // const devices = await this.deviceRepo.findAll({
    //   user_id: user.id
    // })

    return { conecteds, actives, monitoring }
  }
}