import { User } from "../../../entities/User";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";

interface DTO{
  id: string,
  user: User,
  mode: 'toggler',
  state: string
}
export class UpdateDeviceStateUseCase{
  constructor(
    private deviceRepo: IDeviceRepository
  ){}

  async execute({ id, mode, state, user }:DTO){
    const error = [
      [!id, 'É obrigatório informar o id do dispositivo'],
      [mode !== 'toggler', 'Modo de alteração de estado do dispositivo inválido'],
      [!user, 'É obrigatório estar autenticado'],
      [!state, 'É obrigatório informar o novo estado']
    ].find(([hasError]) => hasError)?.[1] as string | undefined;

    if(error) throw new Error(error);

    const device = await this.deviceRepo.find(id, { user_id: user.id }, { include: { device_type: true } })
    if(!device) throw new Error(
      'Não foi possível localizar o dispositivo'
    )
    if(device.status !== 'ativo') throw new Error(
      'O dispositivo não está ativo no momento'
    )

    if(device.state === state) return { state }

    const now = new Date();
    await this.deviceRepo.update(device.id, {
      ...device,
      state: state,
      updated_at: now,
      state_changed_at: now
    })

    return { state }
  }
}