<template>
  <div class="fillContain" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
    <!--顶部部分-->
    <el-row style="width: 100%; padding:10px 15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24" class="makeCenter">
        <div class="makeCenter">
          <img src="./../assets/list.png" style="height: 35px;" />
          <div style="text-align: center;color: #409EFF;margin-left: 10px;">请先选择课程</div>
        </div>
        <div class="makeCenter">
          <!--搜索框-->
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" size="small"></el-input>
        </div>
      </el-col>
    </el-row>
    <!--表格部分-->
    <el-row style="height: 90%;width: 100%; padding:5px 15px;">
      <el-col :span="24">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="科目" min-width="200px">
              <template slot-scope="scope">
                <span>{{ scope.row.courseName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="班级" min-width="200px">
              <template slot-scope="scope">
                <span>{{ scope.row.className }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学年" min-width="170px">
              <template slot-scope="scope">
                <span>{{ scope.row.schoolYear }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学期" min-width="170px">
              <template slot-scope="scope">
                <span>{{ myfilter2(scope.row.semester) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="300px">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleTest(scope.row)" icon="el-icon-view" type="primary" plain >试卷生成</el-button>
                <el-button size="mini" @click="nowTest(scope.row)" icon="el-icon-time" type="success" plain >当前考试</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
      <el-col :span="24" >
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
    <!--考试选择模态框-->
    <el-dialog title="选择考试" :visible.sync="testmodel" width="30%">
      <div v-for="(value,index) in this.testNowList" :key="index" style="text-align: center;margin: 10px">
        <span>考试{{index+1}}</span>
        <el-button size="mini" type="success" plain style="margin: 0px 40px" @click="testGo(value)">查看考试情况</el-button>
      </div>
    </el-dialog>
    <!--暂无考试模态框-->
    <el-dialog title="选择考试" :visible.sync="nomodel" width="30%">
      <div style="text-align: center;color: #E6A23C;">
        <el-row type="flex" justify="center" style="display: flex;align-items: center;min-height: 100px;">
          <img src="../assets/sweat.png" style="height: 30px;">
          <div style="margin-left:15px;font-size: 20px ">当前暂无考试</div>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableData: [],
      labelPosition: 'right',
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      testmodel: false,
      nomodel: false,
      testNowList: []
    }
  },
  mounted () {
    this.getCoursesList2()
    this.getCount2()
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
      this.getCoursesList2()
      this.getCount2()
    },
    // 获取课程列表
    getCoursesList2 () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        offset: this.offset,
        limit: this.limit
      }
      axios.get('/lists/courseList2', {
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
    getCount2 () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId
      }
      axios.get('/courses/courseCount2', {
        params: param
      }).then((response) => {
        var res = response.data
        this.count = Number(res.result)
        // console.log(res)
      })
    },
    // 试卷生成
    handleTest (row) {
      // localStorage.setItem('courseId', courseId)
      this.$router.push({path: '/teacher/testRelease/testSelect', query: {courseId: row._id}})
    },
    // 当前考试
    nowTest (row) {
      var courseId = row._id
      var param = {
        courseId: courseId
      }
      axios.get('/lists/testNowList', {
        params: param
      }).then((response) => {
        var res = response.data
        this.testNowList = res.result.testNow
        if (res.result.testNow.length !== 0) {
          this.testmodel = true
        } else {
          this.nomodel = true
        }
      })
    },
    // 查看考试
    testGo (value) {
      this.$router.push({path: '/teacher/testRelease/testNow', query: {testId: value}})
    }
  }
}
</script>

<style scoped>

</style>
