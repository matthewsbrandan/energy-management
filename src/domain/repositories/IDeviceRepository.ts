import { Device, IDevice } from "../entities/Device"

export interface IDeviceRepository{
  findAll: () => Promise<Device[]>
  store: (device: Omit<IDevice, 'id'>) => Promise<Device>
  update: (id: string, device: Omit<IDevice, 'id'>) => Promise<Device>
  delete: (id: string) => Promise<void>
}