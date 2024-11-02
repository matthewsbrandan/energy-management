import { User } from "../../../entities/User";
import { IDeviceLogRepository } from "../../../repositories/IDeviceLogRepository";

interface Timeline{
  type?: 'inativo' | 'ativo',
  percent: number
}
interface DTO{
  id: string,
  user: User
}
export class TogglerLastEightHoursUseCase{
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

    const timeline : Timeline[]= [];
    if(logs.length === 0){
      timeline.push({ percent: 100 });
      return timeline;
    }

    const total = 8*60;

    const last_index = logs.length - 1;
    let acc = 0;
    let last_type = undefined;
    // [ ] ver se existe algum log anterior ao primeiro, se não houver a diferenca do topico anterior terá type undefined
    for(const [i, log] of logs.entries()){
      const diffInMs = i === 0 ? (
        log.created_at.getTime() - heightHoursAgo.getTime()
      ):(
        log.created_at.getTime() - logs[i-1].created_at.getTime()
      );

      const diffInMin = diffInMs / (1000 * 60);
      const percent = Math.round((diffInMin * 100) / total);
      acc+=percent;

      timeline.push({
        type: last_type,
        percent
      })

      last_type = log.value == 1 ? 'ativo' : 'inativo'

      if(last_index === i){
        let rest = 100 - acc;
        if(rest <= 0) rest = 0;

        timeline.push({
          type: last_type,
          percent: rest
        })
      }
    }

    return timeline;
  }
}