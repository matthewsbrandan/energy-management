import { FindDeviceOptions, IDeviceRepository } from "../../../repositories/IDeviceRepository";

interface DTO{
  query?: any,
  options?: FindDeviceOptions
}
export class FindAllDevicesUseCase{
  constructor(
    private deviceRepo: IDeviceRepository
  ){}

  async execute({ query, options }:DTO){
    return await this.deviceRepo.findAll(query, options);
  }
}