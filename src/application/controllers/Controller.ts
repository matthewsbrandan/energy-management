import { Request, Response } from "express";
import { User } from "../../domain/entities/User";

export interface HeaderOptionsType{
  import?: {
    css?: ('modal.css')[]
  }
}
export type NotifyTypes = 'error' | 'success' | 'info'
export class Controller{
  protected request : Request
  protected response : Response
  protected auth_user: User

  private verifyIfIsInitialized(){
    if(!this.request || !this.response) throw new Error(
      'Initialize req and res on your controller'
    )
  }

  init(request: Request, response: Response){
    this.request = request
    this.response = response
    this.auth_user = this.request.user as User
  }
  
  view(name: string, props?:{
    headerOptions?: HeaderOptionsType,
    error?: {
      title?: string,
      message?: string,
      /** default: true */
      goBack?: boolean
    },
    data?: Record<string, any>
  }){
    this.verifyIfIsInitialized()

    const {
      headerOptions = { },
      error = {},
      data = {}
    } = props ?? {}

    if(error.goBack === undefined) error.goBack = true

    return this.response.render(name, {
      data,
      error,
      headerOptions,
      auth_user: this.auth_user,
    })
  }

  notify(type: NotifyTypes, message: string){
    this.verifyIfIsInitialized()

    // [ ] resolver problema do flash
    // this.request.flash('message', `${type}: ${message}`);
  }

  redirectWithMessage(to: string, type: NotifyTypes, message: string){
    this.notify(type,message)

    return this.response.redirect(to)
  }
}