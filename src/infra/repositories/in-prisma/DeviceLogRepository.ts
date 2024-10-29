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
}