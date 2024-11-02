import { Device, IDevice } from "../../../domain/entities/Device";
import { FindDeviceOptions, IDeviceRepository } from "../../../domain/repositories/IDeviceRepository";
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
  }: Omit<IDevice, "id">, ignore: ('created_at')[] = []){
    if(data && typeof data !== 'string') data = JSON.stringify(data);
    
    if(!updated_at) updated_at = new Date();

    let transformed : any = {
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

    if(!ignore.includes('created_at')){
      if(!created_at) created_at = new Date();
      transformed.created_at = created_at;
    } 
    return transformed;
  }

  async find(id: string, query?: any, options?: FindDeviceOptions) : Promise<Device> {
    let params : any = { where: {} };
    if(query) params.where = query;
    if(options?.include) params.include = options.include;

    params.where.id = id;

    const device = await db.device.findFirst(params);
    if(!device) throw new Error('Dispositivo não encontrado');

    return this._instance(device);
  }
  async findAll(query?: any, options?: FindDeviceOptions) : Promise<Device[]> {
    let params : any = {};
    if(query) params.where = query;
    if(options?.include) params.include = options.include;

    const devices = await db.device.findMany(params);
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
      where: { id }, data: this._transform(device, ['created_at'])
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
  async unlinkDevices(user_id: string) : Promise<void> {
    try{
      await db.device.updateMany({
        where: { user_id },
        data: {
          ip: undefined,
          status: 'pareado'
        }
      })
    }catch(e){
      throw new Error('Não foi possível desvincular os dispositivos do seu usuário')
    }
  }
}