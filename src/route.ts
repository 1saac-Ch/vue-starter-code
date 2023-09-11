import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(),
})

router.beforeEach((to) => {
  const isAuthenticated = true

  if (to.meta.requireAuth && !isAuthenticated) {
    console.log('YES')
    return {
      path: '/',
    }
  }
})

export default router
