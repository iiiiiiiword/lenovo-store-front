import Vue from "vue";
import VueRouter from 'vue-router';
import Main from "@/views/Main";
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {getItem} from "@/storage";
import {USER_TOKEN_KEY} from "@/config/constants";
import Community from "@/views/MainPage/Community";
import Service from "@/views/MainPage/Service";

import Cart from "@/views/UmainPage/Cart";
import Modify from "@/views/UmainPage/Modify";
import Record from "@/views/UmainPage/Record";
import LoginMain from "@/views/LoginMain";
import After from "@/views/UmainPage/After";
Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    redirect:'/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: {
      title: 'Lenovo-store首页'
    }
  },
  {
    path: '/service',
    name: '/Service',
    component: Service,
    meta: {
      title: '服务'
    }
  },
  {
    path: '/community',
    name: '/Community',
    component: Community,
    meta: {
      title: '社区',
    }
  },
  {
    path: '/cart',
    name: '/Cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/modify',
    name: '/Modify',
    component: Modify,
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/record',
    name: '/Record',
    component: Record,
    meta: {
      title: '购买记录'
    }
  },{
    path: '/cart',
    name: '/Cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/modify',
    name: '/Modify',
    component: Modify,
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/record',
    name: '/Record',
    component: Record,
    meta: {
      title: '购买记录'
    }
  },
  {
    path: '/loginmain',
    name: '/LoginMain',
    component: LoginMain,
    meta: {
      title: '个人首页'
    }
  },
  {
    path: '/after',
    name: '/After',
    component: After,
    meta: {
      title: '售后处理'
    }
  },
]
const router = new VueRouter({
  routes
})
const IGNORE_URLS = ['/','/main','/community','/service','/store']
router.beforeEach((toRoute,fromRoute,next) => {
  if (IGNORE_URLS.includes(toRoute.path)) {
    next()
  }else {
    let token = getItem(USER_TOKEN_KEY)
    if (token) {
      return next()
    }
    return next({path:IGNORE_URLS[0]})
  }
})
router.afterEach((toRoute,fromRoute) => {
  Nprogress.done()
  document.title = toRoute.meta.title
})

export default router
