import { DeviceType } from "../../../domain/entities/DeviceType";
import { IDeviceTypeRepository } from "../../../domain/repositories/IDeviceTypeRepository";
import { prisma as db } from "../../config/prisma";

export class DeviceTypeRepository implements IDeviceTypeRepository{
  private _instance(response: any){
    const deviceType = new DeviceType(response, response.id ?? undefined)
    return deviceType
  }

  async findAll() : Promise<DeviceType[]> {
    const deviceTypes = await db.deviceType.findMany();
    return deviceTypes.map(deviceType => this._instance(deviceType));
  }
}