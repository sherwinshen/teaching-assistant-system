import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentName: '',
    studentId: ''
  },
  mutations: {
    // 更新用户信息
    updateStudentName (state, studentName) {
      state.studentName = studentName
    },
    updateStudentId (state, studentId) {
      state.studentId = studentId
    }
  }
})
