import { IDevice } from "../../../entities/Device";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";
import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

type DTO = Omit<IDevice, 'id' | 'created_at' | 'updated_at' | 'state_changed_at' | 'status_changed_at'>

export class UpdateDeviceUseCase{
  constructor(
    private deviceRepo: IDeviceRepository,
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute(id: string, device: DTO){
    if(!device.type) throw new Error('É obrigatório informar o tipo de dispositivo');

    await this.deviceTypeRepo.findById(device.type);

    // [ ] MELHORAR VERIFICAÇÕES DE TRANSIÇÃO DE ESTADO PARA CONTROLAR MELHOR AS DATAS
    // [ ] LIDAR COM CONSEQUENCIAS DE ALTERAÇÃO DE IP

    return await this.deviceRepo.update(id, {
      ...device,
      state_changed_at: new Date(),
      status_changed_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    });
  }
}