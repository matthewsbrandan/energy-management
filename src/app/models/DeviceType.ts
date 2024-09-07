import { v4 as uuid } from 'uuid';

interface DeviceTypeType{
  id:	string;
  name:	string;
  data?: any;
}

export class DeviceType{
  public readonly id:	string;
  public name!:	string;
  public data?: any;

  constructor(props: Omit<DeviceTypeType, 'id'>, id?: string){
    Object.assign(this, props);

    this.id = id ?? uuid();
  }
}