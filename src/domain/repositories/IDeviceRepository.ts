import { Device, IDevice } from "../entities/Device"

export interface FindDeviceOptions{ include: { device_type?: boolean } }

export interface IDeviceRepository{
  find: (id: string, query?: any, options?: FindDeviceOptions) => Promise<Device>
  findAll: (query?: any, options?: FindDeviceOptions) => Promise<Device[]>
  store: (device: Omit<IDevice, 'id'>) => Promise<Device>
  update: (id: string, device: Omit<IDevice, 'id'>) => Promise<Device>
  delete: (id: string) => Promise<void>
  unlinkDevices: (user_id: string) => Promise<void>
  count: (query: any) => Promise<number>
}