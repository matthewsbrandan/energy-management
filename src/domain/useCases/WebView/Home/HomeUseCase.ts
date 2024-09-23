import { FindAllDevicesUseCase } from "../../Device/FindAllDevices/FindAllDevicesUseCase";

export class HomeUseCase{
  constructor(private findAllDevices: FindAllDevicesUseCase){}

  async execute(){
    // [ ] DEVE BUSCAR APENAS OS DISPOSITIVOS COM USER_ID IGUAL USUÁRIO AUTENTICADO
    return await this.findAllDevices.execute({ options: { include: { device_type: true } } });
  }
}