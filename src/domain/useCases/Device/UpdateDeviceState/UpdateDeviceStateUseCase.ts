import { User } from "../../../entities/User";
import { IDeviceLogRepository } from "../../../repositories/IDeviceLogRepository";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";

export interface UpdateDeviceStateDTO{
  id: string,
  user: User,
  mode: 'toggler',
  state: string
}
export class UpdateDeviceStateUseCase{
  constructor(
    private deviceRepo: IDeviceRepository,
    private deviceLogRepo: IDeviceLogRepository
  ){}

  async execute({ id, mode, state, user }:UpdateDeviceStateDTO, is_internal: boolean = false){
    const error = [
      [!id, 'É obrigatório informar o id do dispositivo'],
      [mode !== 'toggler', 'Modo de alteração de estado do dispositivo inválido'],
      [!is_internal && !user, 'É obrigatório estar autenticado'],
      [!state, 'É obrigatório informar o novo estado']
    ].find(([hasError]) => hasError)?.[1] as string | undefined;

    if(error) throw new Error(error);

    const device = await this.deviceRepo.find(id, is_internal ? {} : { user_id: user.id }, { include: { device_type: true } })
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
    await this.deviceLogRepo.create({
      created_at: new Date(),
      description: state === 'ativo' ? 'Dispositivo Ligado' : (
        state === 'inativo' ? 'Dispositivo Desligado' : `Estado alterado para ${state}`
      ),
      device_id: id,
      user_id: device.user_id,
      value: state === 'ativo' ? 1 : state === 'inativo' ? 0 : -1
    })
    
    return { state }
  }
}