import { v4 as uuid } from 'uuid';

export interface DeviceTypeType{
  id:	string;
  name:	string;
  data?: any;
}

export class DeviceType{
  public readonly id:	string;
  public name:	string;
  public data?: any;

  constructor(props: Omit<DeviceTypeType, 'id'>, id?: string){
    Object.assign(this, props);

    this.id = id ?? uuid();

    this.convertDataStringToObject();
  }

  private convertDataStringToObject(){
    if(this.data && typeof this.data === 'string'){
      try{ this.data = JSON.parse(this.data); }
      catch(e){ this.data = undefined; }
    }
  }
}