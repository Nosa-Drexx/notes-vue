import { createRouter, createWebHistory } from 'vue-router'
import NoteView from '../views/NoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: NoteView
    },
    {
      path: '/starred',
      name: 'starred',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StarredNotesView.vue')
    },
    {
      path: '/trash',
      name: 'trash',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TrashNotesView.vue')
    }
  ]
})

export default router
