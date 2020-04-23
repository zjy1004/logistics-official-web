<template>
   <div class="apply-for">
     <div class="af-banner"><img src="../../images/申请合作banner.jpg" alt=""></div>
     <div class="af-content">
       <div class="con-wrap">
         <div class="w-nav">
          <span style="cursor: pointer;" @click="toIndex()">首页</span>
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
              <el-form-item label="所在区域:">
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
              <el-button type="primary" @click="submitForm('form')">提交申请</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
         </div>
       </div>
     </div>
   </div>
</template>

<script type="">
import ApplyForAjax from '@/api/ApplyFor/ApplyFor.js'
export default {
  name: 'ApplyForCooperation',
  components: {},
  data () {
    return {
      form: {
        componyName: '',
        user: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        mark: ''
      },
      areaPList: [],
      areaCList: [],
      areaQList: [],
      rules: {
        componyName: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号不合法', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    let obj = {}
    obj.areaParentCode = 0
    this.QueryAreaList(obj, 'province')
  },
  computed: {
    provinceCode () {
      return this.form.province
    },
    cityCode () {
      return this.form.city
    }
  },
  watch: {
    provinceCode (newVal, oldVal) {
      if (newVal !== oldVal) {
        // this.form.addressSaveData.provinceCode = newVal
        this.areaPList.forEach(item => {
          if (this.form.city !== item) {
            this.form.city = ''
          } else {

          }
        })
        this.QueryAreaList({areaParentCode: newVal}, 'city')
      }
    },
    cityCode (newVal, oldVal) {
      if (newVal !== oldVal) {
        // this.form.addressSaveData.cityCode = newVal
        this.areaCList.forEach(item => {
          if (this.form.area !== item) {
            this.form.area = ''
          } else {

          }
        })
        this.QueryAreaList({areaParentCode: newVal}, 'area')
      }
    }
  },
  methods: {
    QueryAreaList (val, flag) { // 省市
      ApplyForAjax.QueryAreaList(val).then(res => {
        if (res.code === 200) {
          if (flag === 'province') {
            this.areaPList = res.data
          }
          if (flag === 'city') {
            this.areaCList = res.data
          }
          if (flag === 'area') {
            this.areaQList = res.data
          }
        }
      })
    },
    toIndex () {
      this.$router.push({name: 'Index'})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          debugger
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.form.province = ''
      this.form.city = ''
      this.form.area = ''
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
        .el-button {
          padding: 0;
          width: 120px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border: none;
          background:rgba(150,162,190,1);
          border-radius:4px;
          color: #fff;
        }
        .el-button--primary {
          background:rgba(89,130,247,1);
        }
        .el-button+.el-button {
          margin-left: 12px;
        }
      }
    }
    .input-class { .el-input { width: 290px; } }
    .select-class {
      .el-form-item__content {
        display: flex;
        width: 465px;
        // justify-content: space-between;
        .el-select {
          display: block;
          margin-right: 8px;
        }
      }
      .el-input {
        width: 150px;
        .el-input__inner {
          height: 34px;
          line-height: 34px;
          color: #0A1633;
          font-size: 14px;
          padding-right: 0;
        }
      }
    }
    .mark {
      .el-textarea { width: 466px; }
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
