<template>
  <div class="fillContain" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;"
       v-loading="loading">
    <!--顶部部分-->
    <el-row style="width: 100%; padding:5px 15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
        <div class="makeCenter">
          <!--添加试题按钮-->
          <el-button type="primary" icon="el-icon-plus" plain style="margin-left: 20px" size="small"
                     @click="addQuestion">添加试题
          </el-button>
          <!--批量导入按钮-->
          <el-button type="success" icon="el-icon-download" plain style="margin-left: 20px" size="small"
                     @click="batchImportmodel = true">批量导入
          </el-button>
          <!--回收站按钮-->
          <el-button icon="el-icon-tickets" plain style="margin-left: 20px" size="small">&ensp;回收站&ensp;</el-button>
          <!--删除题库按钮-->
          <el-button type="danger" icon="el-icon-delete" plain style="margin-left: 20px" size="small"
                     @click="deleteBank">删除题库
          </el-button>
          <!--批量导入模态框-->
          <el-dialog title="批量导入" :visible.sync="batchImportmodel" width="35%" :before-close="importclose">
            <!--提示框-->
            <div style="text-align: center;margin-bottom: 10px;">
              <el-alert title="请严格按照模版格式上传，否则无法导入" type="warning" :closable="false" show-icon center></el-alert>
            </div>
            <!--文件上传-->
            <div style="border: 2px dashed #C8CBCE;padding: 40px 0px;margin-bottom: 15px">
              <form enctype='multipart/form-data' style="text-align: center">
                <input type="file" id="resource" name="resource" @change="getFile($event)">
                <button type="submit" @click="submitForm($event)" class="uploadBtn">确认上传</button>
              </form>
            </div>
            <!--模版下载-->
            <div style="text-align: center;font-size: 13px;line-height: 18px;">
              导入模版:&emsp;<a style="color:#F56C6C;text-decoration:underline" href="/upload/questionTemplate">点击下载</a>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <!--筛选部分-->
    <el-row style="width: 100%; padding:15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24">
        <div class="myflex">
          <!--筛选条件-->
          <div>
            <span style="margin-right: 20px">按条件筛选</span>
          </div>
          <div>
            <span>类型:</span>
            <el-select v-model="value1" clearable placeholder="请选择" size="small">
              <el-option
                v-for="item in options1"
                :key="item.value1"
                :label="item.label1"
                :value="item.value1">
              </el-option>
            </el-select>
          </div>
          <div>
            <span>难度:</span>
            <el-select v-model="value2" clearable placeholder="请选择" size="small">
              <el-option
                v-for="item in options2"
                :key="item.value2"
                :label="item.label2"
                :value="item.value2">
              </el-option>
            </el-select>
          </div>
          <div class="makeCenter">
            <span style="width: 45px;font-size: 14px;">章节:</span>
            <el-input v-model="value3" placeholder="请输入数字，如1" size="small"></el-input>
          </div>
          <!--筛选按钮-->
          <div>
            <el-button type="primary" size="small" plain @click="filterBtn">确认筛选</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--表格部分-->
    <el-row style="height: 90%;width: 100%; padding: 15px;">
      <el-col :span="24" style="width: 100%; ">
        <template>
          <el-table :data="tableData" style="width: 100%" height="450">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="题干">
                    <span>{{ props.row.stem }}</span>
                  </el-form-item>
                  <el-form-item label="选项" v-if="props.row.questionType==='2' || props.row.questionType==='1'">
                    <span style="color:#F56C6C">A：{{ props.row.optionA }}&emsp;&emsp;</span>
                    <span style="color:#F56C6C">B：{{ props.row.optionB }}&emsp;&emsp;</span>
                    <span style="color:#F56C6C">C：{{ props.row.optionC }}&emsp;&emsp;</span>
                    <span style="color:#F56C6C">D：{{ props.row.optionD }}&emsp;&emsp;</span>
                  </el-form-item>
                  <el-form-item label="答案" v-if="props.row.questionType==='2' || props.row.questionType==='1'">
                    <span v-for="item in props.row.answer" :key="item" style="color:#F56C6C;">{{item}}&emsp;</span>
                  </el-form-item>
                  <el-form-item label="答案" v-if="props.row.questionType==='3'">
                    <span v-for="item in props.row.answer" :key="item" style="color:#F56C6C;">{{ myfilter5(item) }}&emsp;</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="类型" min-width="60">
              <template slot-scope="props">
                <span>{{ myfilter3(props.row.questionType)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="章节" min-width="60">
              <template slot-scope="props">
                <span>{{ myfilter1(props.row.chapter)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="难度" min-width="60">
              <template slot-scope="props">
                <span>{{ myfilter2(props.row.difficulty)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="题干" :show-overflow-tooltip="isTrue" width="280">
              <template slot-scope="props">
                <span>{{ props.row.stem }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="props">
                <el-button size="mini" type="primary" icon="el-icon-edit" plain>编&emsp;辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain
                           @click="handleDelete(props.$index, props.row)">删&emsp;除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
      <el-col :span="24" v-if="isFilter === false">
        <div class="block" style="margin-top: 15px">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="this.count">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="24" v-if="isFilter === true">
        <div class="block" style="margin-top: 15px">
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page.sync="currentPage2"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="this.count2">
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
      loading: false,
      batchImportmodel: false,
      bankId: '',
      isFilter: false,
      isTrue: true,
      options1: [
        {
          value1: '1',
          label1: '单选题'
        }, {
          value1: '2',
          label1: '多选题'
        }, {
          value1: '3',
          label1: '判断题'
        }],
      value1: '',
      options2: [
        {
          value2: '3',
          label2: '难'
        }, {
          value2: '2',
          label2: '中'
        }, {
          value2: '1',
          label2: '易'
        }],
      value2: '',
      options3: [
        {
          value3: '1',
          label3: '1'
        }, {
          value3: '2',
          label3: '2'
        }, {
          value3: '3',
          label3: '3'
        }],
      value3: '',
      chapterInput: '',
      offset: 0,
      limit: 20,
      offset2: 0,
      limit2: 20,
      count: 0,
      count2: 0,
      currentPage: 1,
      currentPage2: 1,
      tableData: []
    }
  },
  created () {
    if (this.$route.query.bankId) {
      this.bankId = this.$route.query.bankId
    } else {
      this.$router.push({path: '/teacher/editBank'})
    }
  },
  mounted () {
    this.getQuestionList()
    this.getQuestionCount()
  },
  methods: {
    // 过滤器
    myfilter1 (value) {
      return '第 ' + value + ' 章'
    },
    myfilter2 (value) {
      if (value === 3 || value === '3') return '难'
      else if (value === 2 || value === '2') return '中'
      else if (value === 1 || value === '1') return '易'
    },
    myfilter3 (value) {
      if (value === 1 || value === '1') return '单选题'
      else if (value === 2 || value === '2') return '多选题'
      else if (value === 3 || value === '3') return '判断题'
    },
    myfilter4 (value) {
      if (value === 1) return 'A'
      else if (value === 2) return 'B'
      else if (value === 3) return 'C'
      else if (value === 4) return 'D'
    },
    myfilter5 (value) {
      if (value === 1 || value === '1') {
        return '正确'
      } else {
        return '错误'
      }
    },
    myfilter6 (value) {
      if (value === 0) return 'A'
      else if (value === 1) return 'B'
      else if (value === 2) return 'C'
      else if (value === 3) return 'D'
    },
    // 返回按钮
    goback () {
      this.$router.back(-1)
    },
    // 分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getQuestionList()
      this.getQuestionCount()
    },
    handleCurrentChange2 (val) {
      this.currentPage2 = val
      this.offset2 = (val - 1) * this.limit2
      this.filterBtn()
    },
    // 获取题目列表
    getQuestionList () {
      var param = {
        bankId: this.bankId,
        offset: this.offset,
        limit: this.limit
      }
      axios.get('/lists/questionList', {
        params: param
      }).then((response) => {
        var res = response.data
        this.tableData = res.result
      })
    },
    // 批量导入后获取题目列表
    getQuestionList2 () {
      var param = {
        bankId: this.bankId,
        offset: 0,
        limit: 20
      }
      axios.get('/lists/questionList', {
        params: param
      }).then((response) => {
        var res = response.data
        this.tableData = res.result
      })
    },
    // 获取题目数量
    getQuestionCount () {
      var param = {
        bankId: this.bankId
      }
      axios.get('/banks/questionCount', {
        params: param
      }).then((response) => {
        var res = response.data
        this.count = res.result
        // console.log(res)
      })
    },
    // 添加题目跳转
    addQuestion () {
      this.$router.push({path: '/teacher/bankManage/questionAdd', query: {bankId: this.bankId}})
    },
    // 删除题目
    handleDelete (index, row) {
      this.$confirm('此操作将该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          questionId: row._id,
          bankId: this.bankId
        }
        if (this.isFilter === false) {
          this.count--
        } else {
          this.count2--
        }
        axios.post('/banks/deleteQuestion', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.tableData.splice(index, 1)
            this.$message({
              message: '题目已删除',
              type: 'success'
            })
          }
        })
      })
    },
    // 筛选题目
    filterBtn () {
      if (this.value1 === '' && this.value2 === '' && this.value3 === '') {
        this.offset = 0
        this.limit = 20
        this.count = 0
        this.currentPage = 1
        this.isFilter = false
        this.getQuestionList()
        this.getQuestionCount()
      } else {
        this.isFilter = true
        var param = {
          bankId: this.bankId,
          offset: this.offset2,
          limit: this.limit2,
          questionType: this.value1,
          difficulty: this.value2,
          chapter: this.value3
        }
        axios.get('/lists/questionList2', {
          params: param
        }).then((response) => {
          var res = response.data
          this.tableData = res.result
        })
        axios.get('/banks/questionCount2', {
          params: param
        }).then((response) => {
          var res = response.data
          this.count2 = res.result
        })
      }
    },
    // 删除题库
    deleteBank () {
      this.$confirm('此操作将永久删除该题库及所有题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          bankId: this.bankId
        }
        axios.post('/banks/deleteBank', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.$router.push({path: '/teacher/bankManage'})
            this.$message({
              message: '题库已删除',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 取消批量导入
    importclose () {
      this.batchImportmodel = false
    },
    // 获取文件
    getFile (event) {
      this.file = event.target.files[0]
    },
    // 上传文件
    submitForm (event) {
      this.loading = true
      event.preventDefault()
      let formData = new FormData()
      formData.append('resource', this.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('/upload/bank', formData, config).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var param = {
            bankId: this.bankId,
            filename: res.result.filename
          }
          axios.post('/banks/batchAddition', {
            params: param
          }).then((response) => {
            var res = response.data
            if (res.status === '0') {
              this.batchImportmodel = false
              this.loading = false
              this.$message({
                message: '试题导入成功',
                type: 'success'
              })
              this.getQuestionList2()
              this.getQuestionCount()
              this.isFilter = false
              this.offset = 0
              this.value1 = ''
              this.value2 = ''
              this.value3 = ''
            } else if (res.status === '1') {
              this.batchImportmodel = false
              this.loading = false
              this.$message({
                message: '文件类型或格式错误，请下载模版填写',
                type: 'error'
              })
            }
          })
        } else if (res.status === '1') {
          var param2 = {
            path: res.result
          }
          axios.post('/upload/deleteFile', {
            params: param2
          }).then((response) => {
            var res = response.data
            if (res.status === '0') {
              this.batchImportmodel = false
              this.loading = false
              this.$message({
                message: '文件类型或格式错误，请下载模版填写',
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 60px;
    color: #99a9bf;
    /*color: #409EFF;*/
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    /*color: #99a9bf;*/
  }

  .myflex {
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
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
