import { Device, IDevice } from "../../../domain/entities/Device";
import { IDeviceRepository } from "../../../domain/repositories/IDeviceRepository";
import { prisma as db } from "../../config/prisma";

export class DeviceRepository implements IDeviceRepository{
  private _instance(response: any) : Device {
    const device = new Device(response, response.id ?? undefined)
    return device
  }
  private _transform({ 
    ip,
    type,
    data,
    state,
    title,
    status,
    user_id,
    subgroup,
    created_at,
    updated_at,
    description,
    state_changed_at,
    status_changed_at
  }: Omit<IDevice, "id">){
    if(data && typeof data !== 'string') data = JSON.stringify(data);
    if(!created_at) created_at = new Date();
    if(!updated_at) updated_at = new Date();

    return {
      ip,
      type,
      data,
      state,
      title,
      status,
      user_id,
      subgroup,
      created_at,
      updated_at,
      description,
      state_changed_at,
      status_changed_at
    }
  }

  async findAll() : Promise<Device[]> {
    const devices = await db.device.findMany();
    return devices.map(device => this._instance(device));
  }

  async store(device: Omit<IDevice, "id">): Promise<Device>{
    const response = await db.device.create({
      data: this._transform(device)
    });
    
    return this._instance(response);
  }

  async update(id: string, device: Omit<IDevice, "id">) : Promise<Device> {
    const existentDevice = await db.device.findUnique({
      where: { id }
    })

    if(!existentDevice) throw new Error('Dispositivo não encontrado')

    const response = await db.device.update({ 
      where: { id }, data: this._transform(device)
    })

    return this._instance(response);
  }

  async delete(id: string): Promise<void> {
    try{
      await db.device.delete({
        where: { id }
      })
    }catch(e){
      throw new Error('Não foi possível excluir esse dispositivo.')
    }
  }
}