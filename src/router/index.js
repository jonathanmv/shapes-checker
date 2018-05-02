import Vue from 'vue'
import Router from 'vue-router'
import TrainPage from '@/components/TrainPage'
import ShapesPage from '@/components/ShapesPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShapesPage',
      component: ShapesPage
    },
    {
      path: '/train',
      name: 'TrainPage',
      component: TrainPage
    }
  ]
})
