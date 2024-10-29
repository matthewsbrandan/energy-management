import { v4 as uuid } from 'uuid';
import { DeviceType } from './DeviceType';

export interface IDevice{
  id:	string;
  ip:	string;
  description?:	string;
  title?:	string;
  status:	'desconectado' | 'pareado' | 'ativo';
  user_id?:	string;
  type:	string;
  subgroup?:	string;
  state?:	string;
  data?:	any;
  created_at:	Date;
  updated_at:	Date;
  status_changed_at:	Date;
  state_changed_at:	Date;

  device_type?: DeviceType;
}
export class Device{
  public readonly id:	string;
  public ip:	string;
  public description?:	string;
  public title?:	string;
  public status:	'desconectado' | 'pareado' | 'ativo';
  public user_id?:	string;
  public type:	string;
  public subgroup?:	string;
  public state?:	string;
  public data?:	any;
  public created_at:	Date;
  public updated_at:	Date;
  public status_changed_at:	Date;
  public state_changed_at:	Date;

  public device_type?: DeviceType;

  constructor(props: Omit<IDevice, 'id'>, id?: string){
    Object.assign(this, props);

    this.id = id ?? uuid();

    this.convertDataStringToObject()

    if(props.device_type) this.device_type = new DeviceType(props.device_type, props.device_type.id);
  }

  private convertDataStringToObject(){
    if(this.data && typeof this.data === 'string'){
      try{ this.data = JSON.parse(this.data); }
      catch(e){ this.data = undefined; }
    }
  }
}