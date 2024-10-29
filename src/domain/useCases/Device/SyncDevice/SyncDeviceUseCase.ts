import { Device } from "../../../entities/Device";
import { User } from "../../../entities/User";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";

interface DTO{
  id: string,
  user: User
}
export class SyncDeviceUseCase{
  constructor(
    private deviceRepo: IDeviceRepository
  ){}

  async execute({ id, user }:DTO){
    if(!user.home_ip) throw new Error(
      'Você deve configurar primeiro seu home ip para depois sincronizar dispositivos a sua conta'
    );

    const device = await this.deviceRepo.find(id)

    this.validate(device, user);
    
    const now = new Date();
    await this.deviceRepo.update(id, {
      ...device,
      updated_at: now,
      status_changed_at: now,
      user_id: user.id,
      status: 'ativo'
    })
  }
  private validate(device: Device, user: User) : boolean{
    if(!device) throw new Error('Dispositivo não encontrado');
    if(device.user_id) throw new Error('Esse dispositivo já está associado a outro usuário');
    if(user.home_ip !== device.ip) throw new Error('Este dispositivo não se encontra no seu ip(home-ip)');

    return true;
  }
}