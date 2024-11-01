import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import loadLayoutMiddleware from '../middlewares/loadLayoutMiddleware'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
