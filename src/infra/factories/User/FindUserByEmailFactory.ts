import { FindUserByEmailController } from "../../../application/controllers/User/FindUserByEmailController";
import { FindUserByEmailUseCase } from "../../../domain/useCases/User/FindUserByEmail/FindUserByEmailUseCase";
import { UserRepository } from "../../repositories/in-prisma/UserRepository"

export const FindUserByEmailFactory = () => {
  const userRepo = new UserRepository();

  const useCase = new FindUserByEmailUseCase(
    userRepo
  );

  const controller = new FindUserByEmailController(useCase);

  return { useCase, controller };
}