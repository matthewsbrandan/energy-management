import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

export class FindAllDeviceTypesUseCase{
  constructor(
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute(){
    return await this.deviceTypeRepo.findAll()
  }
}