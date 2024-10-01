import { User } from "../../../entities/User";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";

interface DTO{
  user: User
}
export class PageSyncDeviceUseCase{
  constructor(
    private deviceRepo: IDeviceRepository
  ){}

  async execute({ user }:DTO){
    const devices = await this.deviceRepo.findAll({
      ip: user.home_ip
    }, { include: { device_type: true } })

    return { devices }
  }
}