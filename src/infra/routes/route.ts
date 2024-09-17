import { Router } from "express"
import { apiRouter } from "./api.route"
import { webRouter } from "./web/index.route"

const router = Router()

router.use('/', webRouter)
router.use('/api/', apiRouter)

export { router }

