import { Device, IDevice } from "../../../domain/entities/Device";
import { DeviceLog, IDeviceLog } from "../../../domain/entities/DeviceLog";
import { IDeviceLogRepository } from "../../../domain/repositories/IDeviceLogRepository";
import { FindDeviceOptions } from "../../../domain/repositories/IDeviceRepository";
import { prisma as db } from "../../config/prisma";

export class DeviceLogRepository implements IDeviceLogRepository{
  private _instance(response: any) : DeviceLog {
    const deviceLog = new DeviceLog(response, response.id ?? undefined)
    return deviceLog
  }
  private _transform({ 
    created_at,
    description,
    device_id,
    user_id,
    data,
    value,
  }: Omit<IDeviceLog, "id">){
    if(data && typeof data !== 'string') data = JSON.stringify(data);
    if(!created_at) created_at = new Date();

    return {
      data,
      user_id,
      created_at,
      description,
      device_id,
      value
    }
  }

  async create(device_log: Omit<IDeviceLog, "id">) : Promise<DeviceLog>{
    const response = await db.deviceLog.create({
      data: this._transform(device_log)
    });
    
    return this._instance(response);
  }
  async createMany(device_logs: Omit<IDeviceLog, "id">[]) : Promise<void>{
    await db.deviceLog.createMany({
      data: device_logs.map((device_log) => this._transform(device_log))
    });
  }
  async findAll(device_id: string, query: any = {}, limit: number = 25, orderBy?: Record<string, 'asc' | 'desc'>) : Promise<DeviceLog[]>{
    
    const responses = await db.deviceLog.findMany({
      where: { ...query, device_id },
      ...(limit > -1 ? { take: limit }:{}),
      orderBy
    });

    if(!responses) return [];
    return responses.map(response => this._instance(response));
  }
}