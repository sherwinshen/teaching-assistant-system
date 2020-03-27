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
    <el-row style="padding:10px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24">
        <el-tabs type="border-card" style="">
          <!--单选部分-->
          <el-tab-pane label=" 单  选 " style="min-height:500px;color: #606266">
            <!--题目设置-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目设置</div>
            <!--章节和难度-->
            <div style="margin: 20px 15px">
              <span>章节:</span>
              <el-input v-model="inputChapter1" placeholder="请输入数字，如1" size="small" style="width: 240px;margin:0px 30px"></el-input>
              <span>难度:</span>
              <el-select v-model="value1" placeholder="请选择" size="small" style="width: 280px;margin-left: 30px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--内容设置-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目内容</div>
            <!--题干-->
            <div style="margin: 20px 15px 0px 15px">
              <span>题干:</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="stem1"
                style="width: 480px;margin-left: 30px"
              >
              </el-input>
            </div>
            <!--选项-->
            <el-row>
              <el-col :span="6">
                <div style="margin: 30px 15px;">
                  <div style="margin: 10px 0px">选项A:</div>
                  <el-input v-model="inputOption11" placeholder="" size="small"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="margin: 30px 15px;">
                  <div style="margin: 10px 0px">选项B:</div>
                  <el-input v-model="inputOption12" placeholder="" size="small"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                  <div style="margin: 30px 15px;">
                    <div style="margin: 10px 0px">选项C:</div>
                    <el-input v-model="inputOption13" placeholder="" size="small"></el-input>
                  </div>
              </el-col>
              <el-col :span="6">
                  <div style="margin: 30px 15px;">
                    <div style="margin: 10px 0px">选项D:</div>
                    <el-input v-model="inputOption14" placeholder="" size="small"></el-input>
                  </div>
              </el-col>
            </el-row>
            <!--题目答案-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目答案</div>
            <!--答案选项-->
            <el-radio-group v-model="answer1" style="margin: 20px 15px 10px 15px;">
              <el-radio label="A">选项A</el-radio>
              <el-radio label="B">选项B</el-radio>
              <el-radio label="C">选项C</el-radio>
              <el-radio label="D">选项D</el-radio>
            </el-radio-group>
            <!--提交按钮-->
            <div style="text-align: center;margin: 20px 0px 0px">
              <el-button type="primary" plain style="width: 150px;margin: 0px 20px" @click="addQuestion1('1')">提&emsp;&emsp;交</el-button>
              <el-button type="warning" plain style="width: 150px;margin: 0px 20px" @click="close1">清&emsp;&emsp;空</el-button>
            </div>
          </el-tab-pane>
          <!--多选部分-->
          <el-tab-pane label=" 多  选 " style="min-height:500px;color: #606266">
            <!--题目设置-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目设置</div>
            <!--章节-->
            <div style="margin: 20px 15px">
              <span>章节:</span>
              <el-input v-model="inputChapter2" placeholder="请输入数字，如1" size="small" style="width: 240px;margin:0px 30px"></el-input>
              <span>难度:</span>
              <el-select v-model="value2" placeholder="请选择" size="small" style="width: 280px;margin-left: 30px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--内容设置-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目内容</div>
            <!--题干-->
            <div style="margin: 20px 15px 0px 15px">
              <span>题干:</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="stem2"
                style="width: 480px;margin-left: 30px"
              >
              </el-input>
            </div>
            <!--选项-->
            <el-row>
              <el-col :span="6">
                <div style="margin: 30px 15px;">
                  <div style="margin: 10px 0px">选项A:</div>
                  <el-input v-model="inputOption21" placeholder="" size="small"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="margin: 30px 15px;">
                  <div style="margin: 10px 0px">选项B:</div>
                  <el-input v-model="inputOption22" placeholder="" size="small"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                  <div style="margin: 30px 15px;">
                    <div style="margin: 10px 0px">选项C:</div>
                    <el-input v-model="inputOption23" placeholder="" size="small"></el-input>
                  </div>
              </el-col>
              <el-col :span="6">
                  <div style="margin: 30px 15px;">
                    <div style="margin: 10px 0px">选项D:</div>
                    <el-input v-model="inputOption24" placeholder="" size="small"></el-input>
                  </div>
              </el-col>
            </el-row>
            <!--题目答案-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目答案</div>
            <!--答案选项-->
            <el-checkbox-group v-model="answer2" style="margin: 20px 15px 10px 15px;">
              <el-checkbox label="A">选项A</el-checkbox>
              <el-checkbox label="B">选项B</el-checkbox>
              <el-checkbox label="C">选项C</el-checkbox>
              <el-checkbox label="D">选项D</el-checkbox>
            </el-checkbox-group>
            <!--提交按钮-->
            <div style="text-align: center;margin: 30px 0px 0px">
              <el-button type="primary" plain style="width: 150px;margin: 0px 20px"  @click="addQuestion2('2')">提&emsp;&emsp;交</el-button>
              <el-button type="warning" plain style="width: 150px;margin: 0px 20px" @click="close2">清&emsp;&emsp;空</el-button>
            </div>
          </el-tab-pane>
          <!--判断部分-->
          <el-tab-pane label=" 判  断 " style="min-height:500px;color: #606266">
            <!--题目设置-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目设置</div>
            <!--章节-->
            <div style="margin: 20px 15px">
              <span>章节:</span>
              <el-input v-model="inputChapter3" placeholder="请输入数字，如1" size="small" style="width: 240px;margin:0px 30px"></el-input>
              <span>难度:</span>
              <el-select v-model="value3" placeholder="请选择" size="small" style="width: 280px;margin-left: 30px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--内容设置-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目内容</div>
            <!--题干-->
            <div style="margin: 20px 15px 20px 15px">
              <span>题干:</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="stem3"
                style="width: 480px;margin-left: 30px"
              >
              </el-input>
            </div>
            <!--题目答案-->
            <div style="border-left: 5px solid #409EFF;padding-left: 10px;font-size:16px;">题目答案</div>
            <!--答案选项-->
            <el-radio-group v-model="answer3" style="margin: 20px 15px 10px 15px;">
              <el-radio :label="1">正确</el-radio>
              <el-radio :label="2">错误</el-radio>
            </el-radio-group>
            <!--提交按钮-->
            <div style="text-align: center;margin: 20px 0px 0px">
              <el-button type="primary" plain style="width: 150px;margin: 0px 20px" @click="addQuestion3('3')">提&emsp;&emsp;交</el-button>
              <el-button type="warning" plain style="width: 150px;margin: 0px 20px" @click="close3">清&emsp;&emsp;空</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      bankId: '',
      options: [
        {
          value: '3',
          label: '难'
        }, {
          value: '2',
          label: '中'
        }, {
          value: '1',
          label: '易'
        }],
      value1: '',
      value2: '',
      value3: '',
      inputChapter1: '',
      inputChapter2: '',
      inputChapter3: '',
      stem1: '',
      stem2: '',
      stem3: '',
      inputOption11: '',
      inputOption12: '',
      inputOption13: '',
      inputOption14: '',
      inputOption21: '',
      inputOption22: '',
      inputOption23: '',
      inputOption24: '',
      answer1: '',
      answer2: [],
      answer3: '',
      hasImg: false,
      fileList: []
    }
  },
  created () {
    if (this.$route.query.bankId) {
      this.bankId = this.$route.query.bankId
    } else {
      this.$router.push({path: '/teacher/editBank'})
    }
  },
  methods: {
    // 返回按钮
    goback () {
      this.$router.back(-1)
    },
    // 清空按钮
    close1 () {
      this.value1 = ''
      this.inputChapter1 = ''
      this.stem1 = ''
      this.inputOption11 = ''
      this.inputOption12 = ''
      this.inputOption13 = ''
      this.inputOption14 = ''
      this.answer1 = ''
    },
    close2 () {
      this.value2 = ''
      this.inputChapter2 = ''
      this.stem2 = ''
      this.inputOption21 = ''
      this.inputOption22 = ''
      this.inputOption23 = ''
      this.inputOption24 = ''
      this.answer2 = []
    },
    close3 () {
      this.value3 = ''
      this.inputChapter3 = ''
      this.stem3 = ''
      this.answer3 = ''
    },
    // 添加按钮
    addQuestion1 (value) {
      var param = {
        bankId: this.bankId,
        chapter: this.inputChapter1,
        questionType: value,
        difficulty: this.value1,
        stem: this.stem1,
        optionA: this.inputOption11,
        optionB: this.inputOption12,
        optionC: this.inputOption13,
        optionD: this.inputOption14,
        answer: [this.answer1]
      }
      axios.post('/banks/addQuestion', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.close1()
          // this.$router.push({path: '/teacher/bankManage/questionList', query: { bankId: this.bankId }})
        } else {
          this.close1()
          this.$message({
            type: 'warning',
            message: '添加失败'
          })
        }
      })
    },
    addQuestion2 (value) {
      var param = {
        bankId: this.bankId,
        chapter: this.inputChapter2,
        questionType: value,
        difficulty: this.value2,
        stem: this.stem2,
        optionA: this.inputOption21,
        optionB: this.inputOption22,
        optionC: this.inputOption23,
        optionD: this.inputOption24,
        answer: this.answer2
      }
      axios.post('/banks/addQuestion', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.close2()
        } else {
          this.close2()
          this.$message({
            type: 'warning',
            message: '添加失败'
          })
        }
      })
    },
    addQuestion3 (value) {
      var param = {
        bankId: this.bankId,
        chapter: this.inputChapter3,
        questionType: value,
        difficulty: this.value3,
        stem: this.stem3,
        answer: [this.answer3]
      }
      axios.post('/banks/addQuestion', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.close3()
          // this.$router.push({path: '/teacher/bankManage/questionList', query: { bankId: this.bankId }})
        } else {
          this.close3()
          this.$message({
            type: 'warning',
            message: '添加失败'
          })
        }
      })
    }
  }
}
</script>

<style>
  .el-radio__label, .el-checkbox__label{
    font-size: 16px;
    font-weight: normal;
  }

</style>
