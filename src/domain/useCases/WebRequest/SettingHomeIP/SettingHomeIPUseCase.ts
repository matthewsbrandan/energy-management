import { User } from "../../../entities/User";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";

interface DTO{
  user: User,
  ip: string
}
export class SettingHomeIPUseCase{
  constructor(
    private userRepo: IUserRepository,
    private deviceRepo: IDeviceRepository
  ){}

  async execute({ user, ip }:DTO){
    if(ip === '::1') ip = '127.0.0.1';
    
    if(!ip) throw new Error('Não foi possível identificar o seu IP');

    if(user.home_ip){
      if(user.home_ip === ip) throw new Error(
        'Este é o mesmo Home-IP que você possui configurado atualmente'
      )

      await this.unlinkDevices(user.id);
    }
  
    await this.userRepo.update(user.id, { home_ip: ip });
  }
  private async unlinkDevices(user_id: string){
  this.deviceRepo.unlinkDevices(user_id)
  }
}