<template>
  <div class="" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
    <!--顶部部分-->
    <el-row style="width: 100%; padding:10px 15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24" class="makeCenter">
        <div class="makeCenter">
          <img src="./../assets/list.png" style="height: 35px;" />
          <div style="text-align: center;color: #409EFF;margin-left: 10px;">课程列表</div>
        </div>
        <div class="makeCenter">
          <!--搜索框-->
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" size="small"></el-input>
          <!--添加课程按钮-->
          <el-button type="primary" icon="el-icon-plus" plain style="margin-left: 20px" @click="addCoursemodel = true" size="small">添加</el-button>
          <!--添加课程模态框-->
          <el-dialog title="添加课程" :visible.sync="addCoursemodel" width="40%" :before-close="addclose">
            <el-form :model="addform" :label-position="labelPosition" >
              <el-form-item label="科目名称" :label-width="formLabelWidth">
                <el-input v-model="addform.courseName" align="right" placeholder="如:计算机网络"></el-input>
              </el-form-item>
              <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input v-model="addform.className" align="right" placeholder="如:14级数字媒体技术"></el-input>
              </el-form-item>
              <el-form-item label="学年" :label-width="formLabelWidth">
                <el-input v-model="addform.schoolYear" align="right" placeholder="如:2017-2018"></el-input>
              </el-form-item>
              <el-form-item label="学期" :label-width="formLabelWidth">
                <el-select v-model="addform.semester" placeholder="请选择学期">
                  <el-option label="第一学期" value="1"></el-option>
                  <el-option label="第二学期" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addclose">取 消</el-button>
              <el-button type="primary" @click="addCourse">确 定</el-button>
            </div>
          </el-dialog>
          <!--编辑课程模态框-->
          <el-dialog title="编辑课程" :visible.sync="editCoursemodel" width="40%" :before-close="editclose">
            <el-form :model="editform" :label-position="labelPosition" >
              <el-form-item label="科目名称" :label-width="formLabelWidth">
                <el-input v-model="editform.courseName" align="right" placeholder="如:计算机网络"></el-input>
              </el-form-item>
              <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input v-model="editform.className" align="right" placeholder="如:14级数字媒体技术"></el-input>
              </el-form-item>
              <el-form-item label="学年" :label-width="formLabelWidth">
                <el-input v-model="editform.schoolYear" align="right" placeholder="如:2017-2018"></el-input>
              </el-form-item>
              <el-form-item label="学期" :label-width="formLabelWidth">
                <el-select v-model="editform.semester" placeholder="请选择学期">
                  <el-option label="第一学期" value="1"></el-option>
                  <el-option label="第二学期" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editclose">取 消</el-button>
              <el-button type="primary" @click="editCourse">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <!--表格部分-->
    <el-row style="height: 90%;width: 100%; padding:5px 15px;">
      <el-col :span="24">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="科目" min-width="180px">
              <template slot-scope="scope">
                <span>{{ scope.row.courseName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="班级" min-width="180px">
              <template slot-scope="scope">
                <span>{{ scope.row.className }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学年" min-width="120px">
              <template slot-scope="scope">
                <span>{{ scope.row.schoolYear }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学期" min-width="120px">
              <template slot-scope="scope">
                <span>{{ myfilter2(scope.row.semester) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" min-width="120px">
              <template slot-scope="scope">
                <span>{{ myfilter1(scope.row.isEnding) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="350px">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" type="primary" plain v-if='scope.row.isEnding===false' @click='handleEdit(scope.$index, scope.row)'>编&emsp;辑</el-button>
                <el-button size="mini" type="info" icon="el-icon-close" v-if='scope.row.isEnding===true' plain disabled>编&emsp;辑</el-button>
                <el-button size="mini" @click="handleEnd(scope.$index, scope.row)" icon="el-icon-check" type="warning" plain v-if='scope.row.isEnding===false'>结&emsp;课</el-button>
                <el-button size="mini" type="info" icon="el-icon-close" v-if='scope.row.isEnding===true' plain disabled>已结课</el-button>
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" type="danger" plain >删&emsp;除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
      <el-col :span="24">
        <div class="block" style="margin-top: 15px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="this.count">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      labelPosition: 'right',
      formLabelWidth: '80px',
      addCoursemodel: false,
      editCoursemodel: false,
      dialogFormVisible2: false,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      addform: {
        _id: '',
        courseName: '',
        className: '',
        schoolYear: '',
        semester: ''
      },
      editform: {
        _id: '',
        courseName: '',
        className: '',
        schoolYear: '',
        semester: ''
      }
    }
  },
  mounted () {
    this.getCoursesList()
    this.getCount()
  },
  methods: {
    // 过滤器
    myfilter1 (value) {
      if (value === true) return '已结课'
      else return '进行中'
    },
    myfilter2 (value) {
      if (value === '1') return '第一学期'
      else return '第二学期'
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getCoursesList()
      this.getCount()
    },
    // 获取课程列表
    getCoursesList () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        offset: this.offset,
        limit: this.limit
      }
      axios.get('/lists/courseList', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '2') {
          this.tableData = []
        } else {
          this.tableData = res.result
        }
        // console.log(res)
      })
    },
    // 获取课程数量
    getCount () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId
      }
      axios.get('/courses/courseCount', {
        params: param
      }).then((response) => {
        var res = response.data
        this.count = Number(res.result)
        // console.log(res)
      })
    },
    // 确认添加课程
    addCourse () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        courseName: this.addform.courseName,
        className: this.addform.className,
        schoolYear: this.addform.schoolYear,
        semester: this.addform.semester
      }
      axios.post('/courses/addCourse', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          // console.log(res)
          this.addCoursemodel = false
          this.addform._id = ''
          this.addform.courseName = ''
          this.addform.className = ''
          this.addform.schoolYear = ''
          this.addform.semester = ''
          this.getCoursesList()
          this.count++
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        } else if (res.status === '2') {
          this.addCoursemodel = false
          this.addform._id = ''
          this.addform.courseName = ''
          this.addform.className = ''
          this.addform.schoolYear = ''
          this.addform.semester = ''
          this.$message({
            type: 'warning',
            message: '已存在相同课程'
          })
        }
      })
    },
    // 取消添加课程
    addclose () {
      this.addform._id = ''
      this.addform.courseName = ''
      this.addform.className = ''
      this.addform.schoolYear = ''
      this.addform.semester = ''
      this.addCoursemodel = false
    },
    // 结束课程
    handleEnd (index, row) {
      this.$confirm('此操作将结束课程，不再进行发布试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          teacherId: row.teacherId,
          _id: row._id
        }
        axios.post('/courses/endCourse', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.getCoursesList()
            this.$message({
              message: '课程已结课',
              type: 'success'
            })
          }
        })
      })
    },
    // 删除课程
    handleDelete (index, row) {
      this.$confirm('此操作将删除课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          teacherId: row.teacherId,
          _id: row._id
        }
        this.count--
        axios.post('/courses/deleteCourse', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.tableData.splice(index, 1)
            this.$message({
              message: '课程已删除',
              type: 'success'
            })
          }
        })
      })
    },
    // 编辑课程
    handleEdit (index, row) {
      this.editCoursemodel = true
      this.editform = row
    },
    editCourse () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        _id: this.editform._id,
        courseName: this.editform.courseName,
        className: this.editform.className,
        schoolYear: this.editform.schoolYear,
        semester: this.editform.semester
      }
      axios.post('/courses/editCourse', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.editCoursemodel = false
          this.editform.courseName = ''
          this.editform.className = ''
          this.editform.schoolYear = ''
          this.editform.semester = ''
          this.getCoursesList()
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        }
      })
    },
    // 取消编辑课程
    editclose () {
      this.getCoursesList()
      this.editCoursemodel = false
    }

  }
}
</script>

<style scoped>

</style>
