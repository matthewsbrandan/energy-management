
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketUpdateStateFactory } from "../factories/Socket/SocketUpdateStateFactory";
import { SocketOnFactory } from "../factories/Socket/SocketOnFactory";

type Callback = (res: ResultAndResponse) => void
interface ResultAndResponse{
  result: boolean,
  response: string,
  data?: any
}

export class SocketEvents{
  constructor(private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>){
    console.log(`Socket conectado ${socket.id}`);

    this.socket.on('on', (event: any, callback: Callback) => SocketOnFactory(this.socket).handle(event, callback))
    this.socket.on('update-state', (event: any, callback: Callback) => SocketUpdateStateFactory(this.socket).handle(event, callback))
  }
}