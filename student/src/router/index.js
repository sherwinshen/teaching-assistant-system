import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const register = r => require.ensure([], () => r(require('@/pages/register')), 'register')
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const courseList = r => require.ensure([], () => r(require('@/pages/courseList')), 'courseList')
const courseList2 = r => require.ensure([], () => r(require('@/pages/courseList2')), 'courseList2')
const courseList3 = r => require.ensure([], () => r(require('@/pages/courseList3')), 'courseList3')
const courseList4 = r => require.ensure([], () => r(require('@/pages/courseList4')), 'courseList4')
const myCourse = r => require.ensure([], () => r(require('@/pages/myCourse')), 'myCourse')
const userCenter = r => require.ensure([], () => r(require('@/pages/userCenter')), 'userCenter')
const addCourse = r => require.ensure([], () => r(require('@/pages/addCourse')), 'addCourse')
const testList = r => require.ensure([], () => r(require('@/pages/testList')), 'testList')
const myScore = r => require.ensure([], () => r(require('@/pages/myScore')), 'myScore')
const myScore2 = r => require.ensure([], () => r(require('@/pages/myScore2')), 'myScore2')
const myScore3 = r => require.ensure([], () => r(require('@/pages/myScore3')), 'myScore3')
const testOnline = r => require.ensure([], () => r(require('@/pages/testOnline')), 'testOnline')
const myTest = r => require.ensure([], () => r(require('@/pages/myTest')), 'myTest')
const allScore = r => require.ensure([], () => r(require('@/pages/allScore')), 'allScore')
const changePwd = r => require.ensure([], () => r(require('@/pages/changePwd')), 'changePwd')
const myCollection = r => require.ensure([], () => r(require('@/pages/myCollection')), 'myCollection')
const kPoint = r => require.ensure([], () => r(require('@/pages/kPoint')), 'kPoint')

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/changePwd',
      component: changePwd
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/courseList',
      component: courseList
    },
    {
      path: '/courseList2',
      component: courseList2
    },
    {
      path: '/courseList3',
      component: courseList3
    },
    {
      path: '/courseList4',
      component: courseList4
    },
    {
      path: '/kPoint',
      component: kPoint
    },
    {
      path: '/myCourse',
      component: myCourse
    },
    {
      path: '/userCenter',
      component: userCenter
    },
    {
      path: '/addCourse',
      component: addCourse
    },
    {
      path: '/testList',
      component: testList
    },
    {
      path: '/myScore',
      component: myScore
    },
    {
      path: '/myScore2',
      component: myScore2
    },
    {
      path: '/myScore3',
      component: myScore3
    },
    {
      path: '/testOnline',
      component: testOnline
    },
    {
      path: '/myTest',
      component: myTest
    },
    {
      path: '/allScore',
      component: allScore
    },
    {
      path: '/myCollection',
      component: myCollection
    }
  ]
})
