import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teacherName: '',
    teacherId: '',
    courseName: '',
    TstudentName: ''
  },
  mutations: {
    // 更新用户信息
    updateTeacherName (state, teacherName) {
      state.teacherName = teacherName
    },
    updateTeacherId (state, teacherId) {
      state.teacherId = teacherId
    },
    updateCourseName (state, courseName) {
      state.courseName = courseName
    },
    updateTstudentName (state, TstudentName) {
      state.TstudentName = TstudentName
    }
  }
})
