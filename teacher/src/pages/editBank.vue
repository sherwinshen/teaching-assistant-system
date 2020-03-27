<template>
  <div class="fillContain" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
    <!--顶部部分-->
    <el-row style="width: 100%; padding:10px 15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24" class="makeCenter">
        <div class="makeCenter">
          <img src="./../assets/list.png" style="height: 35px;" />
          <div style="text-align: center;color: #409EFF;margin-left: 10px;">题库列表</div>
        </div>
        <div class="makeCenter">
          <!--搜索框-->
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" size="small"></el-input>
          <!--添加题库按钮-->
          <el-button type="primary" icon="el-icon-plus" plain style="margin-left: 20px" @click="addBankmodel = true" size="small">添加</el-button>
          <!--添加题库模态框-->
          <el-dialog title="添加课程" :visible.sync="addBankmodel" width="40%" :before-close="addclose">
            <el-form :model="addform" :label-position="labelPosition" >
              <el-form-item label="题库名称" :label-width="formLabelWidth">
                <el-input v-model="addform.bankName" align="right" placeholder="如:计算机网络题库一"></el-input>
              </el-form-item>
              <el-form-item label="科目名称" :label-width="formLabelWidth">
                <el-input v-model="addform.courseName" align="right" placeholder="如:计算机网络"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addclose">取 消</el-button>
              <el-button type="primary" @click="addBank">确 定</el-button>
            </div>
          </el-dialog>
          <!--编辑课程模态框-->
          <el-dialog title="编辑课程" :visible.sync="editBankmodel" :before-close="editclose">
            <el-form :model="editform" :label-position="labelPosition" label-width="80px">
              <el-form-item label="题库名称">
                <el-input v-model="editform.bankName" align="right"></el-input>
              </el-form-item>
              <el-form-item label="科目名称">
                <el-input v-model="editform.courseName" align="right"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editclose">取 消</el-button>
              <el-button type="primary" @click="editBank">确 定</el-button>
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
            <el-table-column label="题库名称" min-width="220px">
              <template slot-scope="scope">
                <span>{{ scope.row.bankName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="科目" min-width="220px">
              <template slot-scope="scope">
                <span>{{ scope.row.courseName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="题量" min-width="190px" >
              <template slot-scope="scope">
                <span>{{ scope.row.questionCount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="400px">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleWatch(scope.row)" icon="el-icon-view" type="success" plain >进入题库</el-button>
                <el-button size="mini" @click='handleEdit(scope.$index, scope.row)' icon="el-icon-edit" type="primary" plain>编&emsp;辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" type="danger" plain>删&emsp;除</el-button>
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
      tableData: [ ],
      labelPosition: 'right',
      formLabelWidth: '80px',
      addBankmodel: false,
      editBankmodel: false,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      addform: {
        bankName: '',
        courseName: ''
      },
      editform: {
        _id: '',
        bankName: '',
        courseName: ''
      }
    }
  },
  created () {
    this.getBankList()
    this.getBankCount()
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getBankList()
    },
    // 获取题库列表
    getBankList () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        offset: this.offset,
        limit: this.limit
      }
      axios.get('/lists/bankList', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '2') {
          this.tableData = []
        } else {
          this.tableData = res.result
        }
      })
    },
    // 获取题库数量
    getBankCount () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId
      }
      axios.get('/banks/bankCount', {
        params: param
      }).then((response) => {
        var res = response.data
        this.count = Number(res.result)
      })
    },
    // 添加题库
    addBank () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        courseName: this.addform.courseName,
        bankName: this.addform.bankName
      }
      axios.post('/banks/addBank', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          // console.log(res)
          this.addBankmodel = false
          this.addform.bankName = ''
          this.addform.courseName = ''
          this.getBankList()
          this.count++
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        } else if (res.status === '2') {
          this.addBankmodel = false
          this.addform.bankName = ''
          this.addform.courseName = ''
          this.$message({
            type: 'warning',
            message: '已存在相同题库名称'
          })
        }
      })
    },
    // 删除题库
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该题库及所有题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          bankId: row._id
        }
        axios.post('/banks/deleteBank', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.count--
            this.tableData.splice(index, 1)
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
    // 编辑题库
    handleEdit (index, row) {
      this.editBankmodel = true
      this.editform = row
    },
    editBank () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        _id: this.editform._id,
        bankName: this.editform.bankName,
        courseName: this.editform.courseName
      }
      axios.post('/banks/editBank', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.editBankmodel = false
          this.editform.courseName = ''
          this.editform.bankName = ''
          this.getBankList()
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        }
      })
    },
    // 取消添加题库
    addclose () {
      this.addform.courseName = ''
      this.addform.bankName = ''
      this.addBankmodel = false
    },
    // 取消编辑课程
    editclose () {
      this.getBankList()
      this.editBankmodel = false
    },
    // 进入题库
    handleWatch (row) {
      this.$router.push({path: '/teacher/bankManage/questionList', query: { bankId: row._id }})
    }
  }
}
</script>

<style scoped>

</style>
