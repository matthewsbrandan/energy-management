import { v4 as uuid } from 'uuid';

interface PreferenceType{
  id: string;
  user_id: string;
  is_darkmode: boolean;
  timeout: number;
  requests_only_at_home: boolean;
}
export class Preference{
  public readonly id: string;
  public user_id: string;
  public is_darkmode?: boolean;
  public timeout?: number;
  public requests_only_at_home?: boolean;

  constructor(props: Omit<PreferenceType, 'id'>, id?: string){
    Object.assign(this, props);

    this.id = id ?? uuid();
  }
}