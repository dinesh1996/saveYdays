/* eslint-disable prettier/prettier */
import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Hello from '@/components/Hello'


import VCalendar from 'v-calendar'

import addpost from '@/components/AddPost'
// import addTicket from '@/components/AddTicket'
import editpost from '@/components/EditPost'
import register from '@/components/Users/Login'
import login from '@/components/Users/Login'
import profile from '@/components/Users/Profile'
import Active from '@/components/Users/Active'

import AllTickets from '@/components/Tickets/AllTickets'
import AddTicket from '@/components/Tickets/AddTicket'
import DashBoard from '@/components/Tickets/DashBoard'

Vue.use(VCalendar, {
  componentPrefix: 'vc'
})
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/add',
      component: addpost,
      name: 'Addpost'
    },
    {
      path: '/posts/:id/edit',
      component: editpost,
      name: 'Editpost'
    },
    {
      path: '/users/register',
      component: register,
      name: 'Register'
    },
    {
      path: '/users/login',
      component: login,
      name: 'Login'
    },
    {
      path: '/users/profile',
      component: profile,
      name: 'Profile'
    },
    {
      path: '/api/active/:token',
      component: Active,
      name: 'Active'
    },
    {
      path: '/tickets',
      component: AllTickets,
      name: 'Tickets'
    }, {

      path: '/tickets/add',
      component: AddTicket,
      name: 'AddTicket'
    }, {

      path: '/board',
      component: DashBoard,
      name: 'DashBoard'
    }
  ]
})
