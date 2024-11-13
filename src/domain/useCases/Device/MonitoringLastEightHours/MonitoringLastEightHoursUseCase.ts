import { User } from "../../../entities/User";
import { IDeviceLogRepository } from "../../../repositories/IDeviceLogRepository";

interface DTO{
  id: string,
  user: User
}
export class MonitoringLastEightHoursUseCase{
  constructor(
    private deviceLog: IDeviceLogRepository
  ){}

  async execute({ id, user }:DTO){
    const error = [
      [!id,'É obrigatório inserir o id do dispositivo'],
      [!user, 'É obrigatório estar autenticado']
    ].find(([hasError]) => hasError)?.[1] as string | undefined

    if(error) throw new Error(error);
 
    const now = new Date()
    const heightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
    heightHoursAgo.setMinutes(0);

    const logs = await this.deviceLog.findAll(id, {
      created_at: { gte: heightHoursAgo }
    }, -1, { 'created_at': 'asc' })

    let timeline : Record<number, number>= {};
    if(logs.length === 0) return timeline;
    
    // [ ] lidar com intervalos maiores do que o intervalo de medição
    logs.forEach((log) => {
      timeline[log.created_at.getTime()] = log.value;
    })

    return timeline;
  }
}