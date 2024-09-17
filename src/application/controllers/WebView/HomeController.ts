import { Request, Response } from 'express';
import { Controller } from '../Controller';

export class HomeController extends Controller{
    async handle(request: Request, response: Response){
        this.init(request, response)
        return this.view('index.ejs')
    }
}
