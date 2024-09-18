import { DeviceType } from "../entities/DeviceType";

export interface IDeviceTypeRepository{
  findAll: () => Promise<DeviceType[]>
  store: (deviceType: Omit<DeviceType, 'id'>) => Promise<DeviceType>
  update: (id: string, deviceType: Omit<DeviceType, 'id'>) => Promise<DeviceType>
  delete: (id: string) => Promise<void>
}