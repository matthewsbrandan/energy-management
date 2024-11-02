import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketUpdateStateController } from "../../../application/controllers/Socket/SocketUpdateStateController";
import { Socket } from "socket.io";
import { UserRepository } from "../../repositories/in-prisma/UserRepository";

export const SocketUpdateStateFactory = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const userRepo = new UserRepository();
  const controller = new SocketUpdateStateController(socket, userRepo);

  return controller;
}