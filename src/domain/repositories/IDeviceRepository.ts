import { Device, IDevice } from "../entities/Device"

export interface FindDeviceOptions{ include: { device_type?: boolean } }

export interface IDeviceRepository{
  findAll: (query?: any, options?: FindDeviceOptions) => Promise<Device[]>
  store: (device: Omit<IDevice, 'id'>) => Promise<Device>
  update: (id: string, device: Omit<IDevice, 'id'>) => Promise<Device>
  delete: (id: string) => Promise<void>
}