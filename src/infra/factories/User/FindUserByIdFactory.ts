import { FindUserByIdController } from "../../../application/controllers/User/FindUserByIdController";
import { FindUserByIdUseCase } from "../../../domain/useCases/User/FindUserById/FindUserByIdUseCase";
import { UserRepository } from "../../repositories/in-prisma/UserRepository"

export const FindUserByIdFactory = () => {
  const userRepo = new UserRepository();

  const useCase = new FindUserByIdUseCase(
    userRepo
  );

  const controller = new FindUserByIdController(useCase);

  return { useCase, controller };
}