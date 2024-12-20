import { DeviceLog, IDeviceLog } from "../entities/DeviceLog"

export interface IDeviceLogRepository{
  create: (device_log: Omit<IDeviceLog, 'id'>) => Promise<DeviceLog>,
  createMany: (device_logs: Omit<IDeviceLog, 'id'>[]) => Promise<void>,
  /** limit = 25 (default) */
  findAll: (device_id: string, query?: any, limit?: number, orderBy?: Record<string, 'asc' | 'desc'>) => Promise<DeviceLog[]>
}