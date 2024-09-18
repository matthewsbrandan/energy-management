import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

export class FindAllDeviceTypeUseCase{
  constructor(
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute(){
    return await this.deviceTypeRepo.findAll()
  }
}