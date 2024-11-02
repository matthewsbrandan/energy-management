
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { UpdateDeviceFactory } from "../factories/Device/UpdateDeviceFactory";
import { UpdateDeviceDTO } from "../../domain/useCases/Device/UpdateDevice/UpdateDeviceUseCase";
import { StoreDeviceFactory } from "../factories/Device/StoreDeviceFactory";
import { SocketUpdateStateFactory } from "../factories/Socket/SocketUpdateStateFactory";

type Callback = (res: ResultAndResponse) => void
interface ResultAndResponse{
  result: boolean,
  response: string,
  data?: any
}
interface OnParams extends UpdateDeviceDTO{
  device_id?: string
}

export class SocketEvents{
  constructor(private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>){
    console.log(`Socket conectado ${socket.id}`);

    this.on();
    this.socket.on('update-state', (event: any, callback: Callback) => SocketUpdateStateFactory(this.socket).handle(event, callback))
  }

  private on(){
    this.socket.on('on', async (event: OnParams, callback: (res: ResultAndResponse) => void) => {
      const { ip, type, description, status, data, device_type, state, subgroup, title, device_id } = event;

      const error = [
        [!ip, 'É obrigatório informar o seu ip'],
        [!type, 'É obrigatório informar o tipo de dispositivo']
      ].find(([hasError]) => hasError)?.[1] as string | undefined;

      if(error){
        callback({ result: false, response: error })
        return;
      }

      try{
        if(device_id){
          const res = await UpdateDeviceFactory().useCase.execute(device_id, {
            ip,
            status,
            type,
            data,
            description,
            device_type,
            state,
            subgroup,
            title
          })
  
          callback({
            result: true,
            response: 'Dispositivo conectado',
            data: res
          })
        }else{
          const res = await StoreDeviceFactory().useCase.execute({
            ip,
            type,
            data,
            description,
            device_type,
            state,
            subgroup,
            title
          })

          callback({
            result: true,
            response: 'Dispositivo adicionado com sucesso',
            data: res
          })
        }
      }catch(e){
        callback({ result: false, response: e.message });
      }
    })
  }
}