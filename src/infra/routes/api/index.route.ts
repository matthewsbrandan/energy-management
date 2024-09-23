import { Router } from "express"
import { deviceRouter } from "./device.route"
import { deviceTypeRouter } from "./deviceType.route"

const apiRouter = Router()

apiRouter.use('/', deviceRouter)     // --prefix: /device
apiRouter.use('/', deviceTypeRouter) // --prefix: /device-type

export { apiRouter }