import { Router } from "express"
import { apiRouter } from "./api/index.route" 
import { webRouter } from "./web/index.route"

const router = Router()

router.use('/', webRouter)
router.use('/', apiRouter) // --prefix: /api

export { router }

