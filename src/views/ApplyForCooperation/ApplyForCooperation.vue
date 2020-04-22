<template>
   <div class="apply-for">
     <div class="af-banner"><img src="../../images/申请合作banner.jpg" alt=""></div>
     <div class="af-content">
       <div class="con-wrap">
         <div class="w-nav">
          <span style="cursor: pointer;">首页</span>
          <span style="margin: 0 2px; font-size: 16px;">></span>
          <span>申请合作</span>
        </div>
         <div class="w-form">
           <el-form :model="form" :rules="rules" ref="form" label-width="100px">
             <div class="input-class">
               <el-form-item label="公司名称:" prop="componyName">
                <el-input v-model="form.componyName" placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </div>
            <div class="input-class">
               <el-form-item label="联系人:" prop="user">
                <el-input v-model="form.user" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </div>
            <div class="input-class">
               <el-form-item label="联系电话:" prop="phone">
                <el-input v-model="form.phone" maxlength="11" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </div>
            <div class="select-class">
              <el-form-item label="所在区域" prop="province">
                <el-select v-model="form.province" placeholder="请选择省">
                  <el-option
                    v-for="(item, index) in areaPList"
                    :key="index"
                    :label="item.areaName"
                    :value="item.areaCode">
                  </el-option>
                </el-select>
                <el-select v-model="form.city" placeholder="请选择市">
                  <el-option
                    v-for="(item, index) in areaCList"
                    :key="index"
                    :label="item.areaName"
                    :value="item.areaCode">
                  </el-option>
                </el-select>
                <el-select v-model="form.area" placeholder="请选择区/县">
                  <el-option
                    v-for="(item, index) in areaQList"
                    :key="index"
                    :label="item.areaName"
                    :value="item.areaCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="mark">
              <el-form-item label="备注：" prop="mark">
                <el-input type="textarea" v-model="form.mark"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
         </div>
       </div>
     </div>
   </div>
</template>

<script type="">
export default {
  name: 'ApplyForCooperation',
  components: {},
  data () {
    return {
      form: {
        componyName: '',
        user: '',
        phone: '',
        date2: '',
        mark: ''
      },
      areaPList: [],
      rules: {
        componyName: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号不合法', trigger: 'blur' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="less">
.apply-for {
  min-width: 1280px;
  .af-banner { min-width: 1280px; height: 422px; }
  .af-content {
    height: 690px;
    background: rgba(246,248,251,1);
    display: flex;
    justify-content: center;
    .con-wrap {
      width: 1200px;
      .w-nav {
        width: 100%;
        height: 50px;
        line-height: 50px;
        span { font-size: 14px; color:#969AA9; font-family: Source Han Sans CN;}
      }
      .w-form {
        width: 100%;
        height: 590px;
        background: #fff;
        padding: 55px 0 0 190px;
      }
    }
  }
}
</style>

<style lang="less">
.apply-for {
  .w-form {
    .el-form {
      .el-form-item {
        margin-bottom: 20px;
        .el-form-item__label {
          color: #0A1633;
        }
        .el-input {
          .el-input__inner {
            border:1px solid rgba(227,230,242,1);
            border-radius:2px;
            height: 34px;
            line-height: 34px;
            color: #0A1633;
            font-size: 14px;
          }
        }
      }
    }
    .input-class { .el-input { width: 290px; } }
    .select-class {
      .el-input {
        width: 150px;
        .el-input__inner {
          height: 34px;
          line-height: 34px;
          color: #0A1633;
          font-size: 14px;
        }
      }
    }
    .mark {
      .el-textarea { width: 465px; }
      .el-textarea__inner {
        border:1px solid rgba(227,230,242,1);
        border-radius:2px;
        color: #0A1633;
        font-size: 14px;
        height: 200px;
      }
    }
  }
}
</style>
