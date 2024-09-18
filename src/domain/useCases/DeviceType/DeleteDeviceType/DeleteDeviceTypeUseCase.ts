import { IDeviceTypeRepository } from "../../../repositories/IDeviceTypeRepository";

export class DeleteDeviceTypeUseCase{
  constructor(
    private deviceTypeRepo: IDeviceTypeRepository
  ){}

  async execute(id: string){
    await this.deviceTypeRepo.delete(id);
  }
}