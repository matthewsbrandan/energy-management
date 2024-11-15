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
    const devices = await this.deviceRepo.findAll({
      user_id: user.id
    }, { include: { device_type: true }})

    const conecteds = devices.length;
    let actives = 0;
    let monitoring = 0;
    let unit = undefined;

    devices.forEach((device) => {
      if(device.status === 'ativo') actives++;
      if(!device.device_type?.data?.monitoring || !device.data?.monitoring?.date) return;

      if(!unit) unit = device.data.monitoring.unit;
      else if(device.data.monitoring.unit !== unit) return;

      const now = new Date();

      if([
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2,'0'),
        String(now.getDate()).padStart(2,'0')
      ].join('-') !== device.data.monitoring.date) return;

      monitoring+= device.data.monitoring.total;
    })

    return { conecteds, actives, monitoring: `${monitoring}${unit}` }
  }
}