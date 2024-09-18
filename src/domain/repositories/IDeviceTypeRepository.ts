import { DeviceType } from "../entities/DeviceType";

export interface IDeviceTypeRepository{
  findAll: () => Promise<DeviceType[]>
}