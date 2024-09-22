import { CreateUserController } from "../../../application/controllers/User/CreateUserController";
import { CreateUserUseCase } from "../../../domain/useCases/User/CreateUser/CreateUserUseCase";
import { UserRepository } from "../../repositories/in-prisma/UserRepository"

export const CreateUserFactory = () => {
  const userRepo = new UserRepository();

  const useCase = new CreateUserUseCase(
    userRepo
  );

  const controller = new CreateUserController(useCase);

  return controller;
}