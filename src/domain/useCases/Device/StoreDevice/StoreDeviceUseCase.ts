
import { IDevice } from "../../../entities/Device";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";
import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

type DTO = Omit<IDevice, 'id' | 'created_at' | 'updated_at' | 'state_changed_at' | 'status_changed_at' | 'status'>
export class StoreDeviceUseCase{
  constructor(
    private deviceRepo: IDeviceRepository,
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute(device: DTO){
    if(!device.type) throw new Error('É obrigatório informar o tipo de dispositivo');

    await this.deviceTypeRepo.findById(device.type);

    return await this.deviceRepo.store({
      ...device,
      status: 'pareado',
      state_changed_at: new Date(),
      status_changed_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    });
  }
}