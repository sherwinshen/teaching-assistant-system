<template>
  <div class="fillContain" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
    <!--顶部部分-->
    <el-row style="width: 100%; padding: 15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
        <div class="makeCenter">
          <!--添加学生按钮-->
          <el-button type="primary" icon="el-icon-plus" plain style="margin-left: 20px" @click="addStudentmodel = true" size="small">添加学生</el-button>
          <!--添加学生模态框-->
          <el-dialog title="添加学生" :visible.sync="addStudentmodel"  width="35%" :before-close="addclose">
            <el-form :model="form" :label-position="labelPosition" >
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.studentName" align="right" placeholder="如:沈炜"></el-input>
              </el-form-item>
              <el-form-item label="学号" :label-width="formLabelWidth">
                <el-input v-model="form.studentId" align="right" placeholder="如:2014329700017"></el-input>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="form.className" align="right" placeholder="如:数字媒体技术14(1)"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addclose">取消</el-button>
              <el-button type="primary" @click="addStudent">确定</el-button>
            </div>
          </el-dialog>
          <!--学生申请按钮-->
          <el-badge :value="12" class="item"><el-button size="small" icon="el-icon-bell" style="margin-left: 20px">学生申请</el-button></el-badge>
          <!--批量导入按钮-->
          <el-button type="success" icon="el-icon-download" plain style="margin-left: 20px" size="small" @click="batchImportmodel = true">批量导入</el-button>
          <!--批量导入模态框-->
          <el-dialog title="批量导入" :visible.sync="batchImportmodel"  width="35%" :before-close="importclose">
            <!--提示框-->
            <div style="text-align: center;margin-bottom: 10px;">
              <el-alert title="请严格按照模版格式上传，否则无法导入" type="warning" :closable="false" show-icon center></el-alert>
            </div>
            <!--文件上传-->
            <div style="border: 2px dashed #C8CBCE;padding: 40px 0px;margin-bottom: 15px">
              <form enctype='multipart/form-data' style="text-align: center">
                <input type="file" id="resource" name="resource" @change="getFile($event)">
                <!--<button type="submit" class="uploadBtn" >确认上传</button>-->
                <button type="submit" @click="submitForm($event)" class="uploadBtn">确认上传</button>
              </form>
            </div>
            <!--模版下载-->
            <div style="text-align: center;font-size: 13px;line-height: 18px;">
              导入模版:&emsp;<a style="color:#F56C6C;text-decoration:underline" href="/upload/studentTemplate">点击下载</a>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <!--表格部分-->
    <el-row style="height: 90%;width: 100%; padding: 15px;">
      <el-col :span="24" style="width: 100%; " >
        <template>
          <el-table :data="tableData" style="width: 100%" height="540" stripe>
            <el-table-column label="科目" min-width="20">
              <template slot-scope="scope">
                <span>{{courseName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" min-width="20">
              <template slot-scope="scope">
                <span>{{ scope.row.studentName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学号" min-width="20">
              <template slot-scope="scope">
                <span>{{ scope.row.studentId}}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业名称" min-width="25" >
              <template slot-scope="scope">
                <span>{{ scope.row.className}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="35">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleWatch(scope.row.studentId, scope.row.studentName)" icon="el-icon-view" type="primary" plain >成&emsp;绩</el-button>
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" type="danger" plain >删&emsp;除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      courseId: '',
      courseName: '',
      tableData: [ ],
      labelPosition: 'right',
      formLabelWidth: '50px',
      addStudentmodel: false,
      batchImportmodel: false,
      form: {
        studentName: '',
        studentId: '',
        className: ''
      }
    }
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
      this.courseName = this.$route.query.courseName
    } else {
      this.$router.push({path: '/teacher/studentManage'})
    }
  },
  mounted () {
    this.getStudentList()
  },
  methods: {
    goback () {
      // this.$router.push({})
      this.$router.back(-1)
    },
    // 取消添加学生
    addclose () {
      this.addStudentmodel = false
      this.form.studentName = ''
      this.form.studentId = ''
      this.form.className = ''
    },
    // 取消批量导入
    importclose () {
      this.batchImportmodel = false
    },
    // 获取学生列表
    getStudentList () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        courseId: this.courseId
      }
      axios.get('/lists/studentList', {
        params: param
      }).then((response) => {
        let res = response.data
        this.tableData = res.result
      })
    },
    // 添加学生
    addStudent () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        studentName: this.form.studentName,
        studentId: this.form.studentId,
        className: this.form.className,
        courseId: this.courseId
      }
      axios.post('/studentsList/addStudent', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          // console.log(res)
          this.addStudentmodel = false
          this.form.studentName = ''
          this.form.className = ''
          this.form.studentId = ''
          this.getStudentList()
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        } else if (res.status === '2') {
          this.addStudentmodel = false
          this.form = ''
          this.$message({
            type: 'warning',
            message: '该学号学生已存在'
          })
        }
      })
    },
    // 删除学生
    handleDelete (index, row) {
      this.$confirm('此操作将删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var teacherId = localStorage.getItem('userId')
        var param = {
          teacherId: teacherId,
          courseId: this.courseId,
          studentId: row.studentId
        }
        axios.get('/studentsList/deleteStudent', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            // this.getCoursesList()
            this.tableData.splice(index, 1)
            this.$message({
              message: '学生已删除',
              type: 'success'
            })
          }
        })
      })
    },
    // 获取文件
    getFile (event) {
      this.file = event.target.files[0]
      // console.log(this.file)
    },
    // 上传文件
    submitForm (event) {
      event.preventDefault()
      let formData = new FormData()
      formData.append('resource', this.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('/upload/student', formData, config).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var param = {
            courseId: this.courseId,
            filename: res.result.filename
          }
          axios.post('/studentsList/batchAddition', {
            params: param
          }).then((response) => {
            var res = response.data
            if (res.status === '0') {
              this.batchImportmodel = false
              this.getStudentList()
              this.$message({
                message: '学生名单导入成功',
                type: 'success'
              })
            } else if (res.status === '1') {
              this.batchImportmodel = false
              this.$message({
                message: '文件类型或格式错误，请下载模版填写',
                type: 'error'
              })
            }
          })
        } else if (res.status === '1') {
          this.batchImportmodel = false
          this.$message({
            message: '文件类型或格式错误，请下载模版填写',
            type: 'error'
          })
        }
      })
    },
    handleWatch (value, studentName) {
      var studentId = value
      this.$store.commit('updateTstudentName', studentName)
      this.$router.push({path: '/teacher/studentManage/studentScore', query: {studentId: studentId, courseId: this.courseId}})
    }

  }
}
</script>

<style scoped>
  .uploadBtn{
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    line-height: 1;
    font-weight: 500;
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
</style>
