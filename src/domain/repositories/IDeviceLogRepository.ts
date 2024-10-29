import { DeviceLog, IDeviceLog } from "../entities/DeviceLog"

export interface IDeviceLogRepository{
  create: (device_log: Omit<IDeviceLog, 'id'>) => Promise<DeviceLog>
}