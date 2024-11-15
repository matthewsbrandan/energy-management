import { Device } from "../../../entities/Device";
import { User } from "../../../entities/User";
import { IDeviceLogRepository } from "../../../repositories/IDeviceLogRepository";
import { IDeviceRepository } from "../../../repositories/IDeviceRepository";

interface MonitoringType{ monitoring: Record<string, number>, unit: string }
export interface UpdateDeviceStateDTO{
  id: string,
  user: User,
  mode: 'toggler' | 'monitoring',
  state: 'ativo' | 'inativo',
  data?: MonitoringType
}
export class UpdateDeviceStateUseCase{
  constructor(
    private deviceRepo: IDeviceRepository,
    private deviceLogRepo: IDeviceLogRepository
  ){}

  async execute({ id, mode, state, user, data }:UpdateDeviceStateDTO, is_internal: boolean = false){
    const error = [
      [!id, 'É obrigatório informar o id do dispositivo'],
      [!['toggler', 'monitoring'].includes(mode), 'Modo de alteração de estado do dispositivo inválido'],
      [!is_internal && !user, 'É obrigatório estar autenticado'],
      [mode === 'toggler' && !state, 'É obrigatório informar o novo estado'],
      [mode === 'monitoring' && (!data.monitoring || !data.unit), 'É obrigatório informar o valor monitorado e a unidade de medida']
    ].find(([hasError]) => hasError)?.[1] as string | undefined;

    if(error) throw new Error(error);

    const device = await this.deviceRepo.find(id, is_internal ? {} : { user_id: user.id }, { include: { device_type: true } })
    if(!device) throw new Error(
      'Não foi possível localizar o dispositivo'
    )
    if(device.status !== 'ativo') throw new Error(
      'O dispositivo não está ativo no momento'
    )
  
    if(mode === 'toggler') return await this.handleToggler({ device, state })
    if(mode === 'monitoring') return await this.handleMonitoring({ device, state, data })
    
  }
  private async handleToggler({ device, state }:{ device: Device, state: 'ativo' | 'inativo' }){
    if(device.state === state) return { state }

    const now = new Date();
    await this.deviceRepo.update(device.id, {
      ...device,
      state: state,
      updated_at: now,
      state_changed_at: now
    })
    await this.deviceLogRepo.create({
      created_at: now,
      description: state === 'ativo' ? 'Dispositivo Ligado' : (
        state === 'inativo' ? 'Dispositivo Desligado' : `Estado alterado para ${state}`
      ),
      device_id: device.id,
      user_id: device.user_id,
      value: state === 'ativo' ? 1 : state === 'inativo' ? 0 : -1
    })
    
    return { state }
  }
  private async handleMonitoring({ device, state, data }:{ device: Device, state?: 'ativo' | 'inativo', data: MonitoringType }){
    const now = new Date();
    const formatDate = (date: Date) => [now.getFullYear(), String(now.getMonth() + 1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-')
    const date = formatDate(now);

    let total = 0;
    if(device.data?.monitoring?.total && device.data?.monitoring.date === date){
      total = device.data.monitoring.total;
    }

    const logs = Object.entries(data.monitoring).map(([timestamps, amount]) => {
      const created_at = new Date(Number(timestamps));
      if(date === formatDate(created_at)) total+=amount;

      return {
        created_at,
        description: `Estado alterado para ${amount}${data.unit}`,
        device_id: device.id,
        user_id: device.user_id,
        value: amount
      }
    });

    const monitoring = {
      date,
      total,
      unit: data.unit
    }

    await this.deviceRepo.update(device.id, {
      ...device,
      ...(state ? { state, state_changed_at: now }:{}),
      updated_at: now,
      data: { ...(device.data ?? {}), monitoring }
    })

    await this.deviceLogRepo.createMany(logs)

    return { monitoring }
  }
}