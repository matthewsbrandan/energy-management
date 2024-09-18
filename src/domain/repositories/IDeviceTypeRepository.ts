import { DeviceType, IDeviceType } from "../entities/DeviceType";

export interface IDeviceTypeRepository{
  findAll: () => Promise<DeviceType[]>
  findById: (id: string)  => Promise<DeviceType>
  store: (deviceType: Omit<IDeviceType, 'id'>) => Promise<DeviceType>
  update: (id: string, deviceType: Omit<IDeviceType, 'id'>) => Promise<DeviceType>
  delete: (id: string) => Promise<void>
}