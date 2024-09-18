import { v4 as uuid } from 'uuid';

interface DeviceLogType{
  id: string;
  description:	string;
  value?:	number;
  data?:	any;
  created_at:	Date;
  user_id:	string;
  device_id:	string;  
}
export class DeviceLog{
  public readonly id: string;
  public description:	string;
  public value?:	number;
  public data?:	any;
  public created_at:	Date;
  public user_id:	string;
  public device_id:	string;

  constructor(props: Omit<DeviceLogType, 'id'>, id?: string){
    Object.assign(this, props)
    this.id = id ?? uuid()
  }
}