import { DeviceType } from "../entities/DeviceType";

export interface IDeviceTypeRepository{
  findAll: () => Promise<DeviceType[]>
  store:   (deviceType: Omit<DeviceType, 'id'>) => Promise<DeviceType>
}