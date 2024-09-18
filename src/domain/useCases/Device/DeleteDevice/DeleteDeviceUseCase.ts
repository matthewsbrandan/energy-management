import { IDeviceRepository } from "../../../repositories/IDeviceRepository";

export class DeleteDeviceUseCase{
  constructor(
    private deviceRepo: IDeviceRepository
  ){}

  async execute(id: string){
    await this.deviceRepo.delete(id);
  }
}