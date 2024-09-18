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

  async store(deviceType: Omit<DeviceType, "id">): Promise<DeviceType>{
    const existentDeviceType = await db.deviceType.findFirst({
      where: { name: deviceType.name }
    })

    if(existentDeviceType) throw new Error(
      'Já existe um tipo de dispositivo com esse nome'
    )

    const response = await db.deviceType.create({
      data: {
        name: deviceType.name,
        data: deviceType.data ? JSON.stringify(deviceType.data) : undefined
      }
    });
    
    return this._instance(response);
  }
}