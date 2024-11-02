import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io";
import { SocketOnController } from "../../../application/controllers/Socket/SocketOnController";

export const SocketOnFactory = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const controller = new SocketOnController(socket);

  return controller;
}