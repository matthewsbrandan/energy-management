import { FindAllDevicesUseCase } from "../../Device/FindAllDevices/FindAllDevicesUseCase";

export class HomeUseCase{
  constructor(private findAllDevices: FindAllDevicesUseCase){}

  async execute({ user_id, ip }:{ ip?: string, user_id: string }){
    if(!ip) return [];

    return await this.findAllDevices.execute({
      query: { ip, user_id },
      options: { include: { device_type: true } }
    });
  }
}