import { DeviceType } from "../../../entities/DeviceType";
import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

export class StoreDeviceTypeUseCase{
  constructor(
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute({ name, data }: Omit<DeviceType, 'id'>){
    return await this.deviceTypeRepo.store({ name, data })
  }
}