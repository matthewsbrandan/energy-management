import { Router } from "express"
import { deviceRouter } from "./device.route"
import { deviceTypeRouter } from "./deviceType.route"

// --prefix: /api
const apiRouter = Router()

apiRouter.use('/device', deviceRouter)
apiRouter.use('/device-type', deviceTypeRouter)

export { apiRouter }