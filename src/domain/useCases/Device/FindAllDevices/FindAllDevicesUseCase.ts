import { IDeviceRepository } from "../../../repositories/IDeviceRepository";

export class FindAllDevicesUseCase{
  constructor(
    private deviceRepo: IDeviceRepository
  ){}

  async execute(){
    return await this.deviceRepo.findAll();
  }
}