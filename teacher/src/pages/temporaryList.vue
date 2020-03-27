<template>
  <div class="fillContain" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
    <!--顶部部分-->
    <el-row style="width: 100%; padding:5px 15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
      </el-col>
    </el-row>
    <!--列表部分-->
    <el-row style="height: 90%;width: 100%; padding:5px 15px;">
        <el-col :span="24" style="height: 100%;">
          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                align="center"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                  <span>{{ myfilter1(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="题目数量" align="center">
                <template slot-scope="scope">
                  <span>{{ myfilter2(scope.row.testContent) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleWatch(scope.row)" icon="el-icon-view" type="primary" plain >查看试卷</el-button>
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
      tableData: []
    }
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/teacher/testRelease'})
    }
    this.getTemporaryList()
  },
  methods: {
    // 过滤器
    myfilter1 (time) {
      var date = new Date(time)
      var localeString = date.toLocaleDateString()
      return localeString
    },
    myfilter2 (value) {
      return value.length
    },
    // 返回按钮
    goback () {
      this.$router.push({path: '/teacher/testRelease/testSelect', query: {courseId: this.coursed}})
    },
    // 获取列表
    getTemporaryList () {
      var param = {
        courseId: this.courseId
      }
      axios.get('/lists/temporaryList', {
        params: param
      }).then((response) => {
        var res = response.data
        this.tableData = res.result
      })
    },
    handleWatch (row) {
      this.$router.push({path: '/teacher/testRelease/testTemporary', query: {testId: row._id}})
    }
  }
}
</script>

<style scoped>

</style>
