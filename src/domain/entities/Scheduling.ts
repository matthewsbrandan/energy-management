import { v4 as uuid } from 'uuid';

interface SchedulingType{
  id: string;
  device_id: string;
  user_id: string;
  action: string;
  data: any;
  scheduled_time: any;
  scheduled_weekdays: any;
  scheduled_date: any;  
}

export class Scheduling{
  public readonly id: string;
  public device_id: string;
  public user_id: string;
  public action: string;
  public data: any;
  public scheduled_time: any;
  public scheduled_weekdays: any;
  public scheduled_date: any;

  constructor(props: Omit<SchedulingType, 'id'>, id?: string){
    Object.assign(this, props);

    this.id = id ?? uuid();
  }
}