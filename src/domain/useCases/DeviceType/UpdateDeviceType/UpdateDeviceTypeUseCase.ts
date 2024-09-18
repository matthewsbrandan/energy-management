import { DeviceTypeType } from "../../../entities/DeviceType";
import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

export class UpdateDeviceTypeUseCase{
  constructor(
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute({ id, name, data }: DeviceTypeType){
    return await this.deviceTypeRepo.update(id, { name, data })
  }
}