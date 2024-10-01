import { ProfileController } from "../../../application/controllers/WebView/ProfileController";

export const ProfileFactory = () => {
  const controller = new ProfileController();

  return controller;
}