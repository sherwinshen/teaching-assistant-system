import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const teacher = r => require.ensure([], () => r(require('@/pages/teacher')), 'teacher')
const classManage = r => require.ensure([], () => r(require('@/pages/classManage')), 'classManage')
const testRelease = r => require.ensure([], () => r(require('@/pages/testRelease')), 'testRelease')
const bankManage = r => require.ensure([], () => r(require('@/pages/bankManage')), 'bankManage')
const studentManage = r => require.ensure([], () => r(require('@/pages/studentManage')), 'studentManage')
const testStatistics = r => require.ensure([], () => r(require('@/pages/testStatistics')), 'testStatistics')
const editStudent = r => require.ensure([], () => r(require('@/pages/editStudent')), 'editStudent')
const studentList = r => require.ensure([], () => r(require('@/pages/studentList')), 'studentList')
const editBank = r => require.ensure([], () => r(require('@/pages/editBank')), 'editBank')
const questionList = r => require.ensure([], () => r(require('@/pages/questionList')), 'questionList')
const editScore = r => require.ensure([], () => r(require('@/pages/editScore')), 'editScore')
const courseScore = r => require.ensure([], () => r(require('@/pages/courseScore')), 'courseScore')
const questionAdd = r => require.ensure([], () => r(require('@/pages/questionAdd')), 'questionAdd')
const editTest = r => require.ensure([], () => r(require('@/pages/editTest')), 'editTest')
const testSelect = r => require.ensure([], () => r(require('@/pages/testSelect')), 'testSelect')
const testNow = r => require.ensure([], () => r(require('@/pages/testNow')), 'testNow')
const testNow2 = r => require.ensure([], () => r(require('@/pages/testNow2')), 'testNow2')
const handTest = r => require.ensure([], () => r(require('@/pages/handTest')), 'handTest')
const testTemporary = r => require.ensure([], () => r(require('@/pages/testTemporary')), 'testTemporary')
const temporaryList = r => require.ensure([], () => r(require('@/pages/temporaryList')), 'temporaryList')
const studentScore = r => require.ensure([], () => r(require('@/pages/studentScore')), 'studentScore')
const changePwd = r => require.ensure([], () => r(require('@/pages/changePwd')), 'changePwd')
const autoTest = r => require.ensure([], () => r(require('@/pages/autoTest')), 'autoTest')

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/teacher',
    component: teacher,
    children: [
      {
        path: '',
        component: classManage
      },
      {
        path: 'changePwd',
        component: changePwd
      },
      {
        path: 'classManage',
        component: classManage
      }, {
        path: 'testRelease',
        component: testRelease,
        children: [
          {
            path: '',
            component: editTest
          },
          {
            path: 'testSelect',
            name: 'testSelect',
            component: testSelect
          },
          {
            path: 'testNow',
            name: 'testNow',
            component: testNow
          },
          {
            path: 'handTest',
            name: 'handTest',
            component: handTest
          },
          {
            path: 'autoTest',
            name: 'autoTest',
            component: autoTest
          },
          {
            path: 'testTemporary',
            name: 'testTemporary',
            component: testTemporary
          },
          {
            path: 'temporaryList',
            name: 'temporaryList',
            component: temporaryList
          }
        ]
      }, {
        path: 'bankManage',
        component: bankManage,
        children: [
          {
            path: '',
            component: editBank
          },
          {
            path: 'questionList',
            name: 'questionList',
            component: questionList
          },
          {
            path: 'questionAdd',
            name: 'questionAdd',
            component: questionAdd
          }
        ]
      }, {
        path: 'studentManage',
        component: studentManage,
        children: [
          {
            path: '',
            component: editStudent
          },
          {
            path: 'studentList',
            name: 'studentList',
            component: studentList
          },
          {
            path: 'studentScore',
            name: 'studentScore',
            component: studentScore
          }
        ]
      }, {
        path: 'testStatistics',
        component: testStatistics,
        children: [
          {
            path: '',
            component: editScore
          },
          {
            path: 'courseScore',
            name: 'courseScore',
            component: courseScore
          },
          {
            path: 'testNow2',
            name: 'testNow2',
            component: testNow2
          },
          {
            path: 'studentScore',
            name: 'studentScore2',
            component: studentScore
          }
        ]
      }
    ]
  }
]

export default new Router({
  routes
})
