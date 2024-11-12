import { Socket } from "socket.io";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UpdateDeviceStateDTO } from "../../../domain/useCases/Device/UpdateDeviceState/UpdateDeviceStateUseCase";
import { UpdateDeviceStateFactory } from "../../../infra/factories/Device/UpdateDeviceStateFactory";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface ResultAndResponse{
  result: boolean,
  response: string,
  data?: any
}
interface UpdateStateParams extends Omit<UpdateDeviceStateDTO, 'user'>{
  user_id?: string
}
export class SocketUpdateStateController{
  constructor(
    private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    private userRepo: IUserRepository
  ){}

  async handle(event: UpdateStateParams, callback: (res: ResultAndResponse) => void){
    const { id, mode, state, data, user_id } = event

    try{
      if(!user_id) throw new Error('É obrigatório informar o seu id');
      
      const user = await this.userRepo.findUserById(user_id);

      if(!user) throw new Error('Não foi possível identificar o seu usuário');

      const res = await UpdateDeviceStateFactory().useCase.execute({
        id,
        mode,
        state,
        user,
        data
      })

      callback({
        result: true,
        response: 'Estado alterado com sucesso',
        data: res
      })

      if(mode === 'toggler'){
        console.log(`toggler:${id}`);
        this.socket.broadcast.emit(`toggler:${id}`, res)
      }
    }catch(e){
      callback({ result: false, response: e.message });
    }
  }
}