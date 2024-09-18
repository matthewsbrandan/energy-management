import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

export class FindByIdDeviceTypeUseCase{
  constructor(
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute(id: string){
    return this.deviceTypeRepo.findById(id);
  }
}