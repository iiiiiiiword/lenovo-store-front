<template>
  <div>
    <el-dialog title="详细情况" :visible="seeMoreDiaVisible"
               @open="handleOpen"
               :before-close="handleCancel"
                style="text-align: center">
      <el-form :model="formData" ref="showForm" :rules="rules">
        <el-form-item label="商品id">
          <span>{{formData.computerId}}</span>
        </el-form-item>
        <el-form-item label="" style="text-align: center">
          <el-image :src="formData.computerImg"></el-image>
        </el-form-item>
        <el-form-item label="名称">
          <span>{{formData.computerName}}</span>
        </el-form-item>
        <el-form-item label="类型">
          <span>{{formData.computerType}}</span>
        </el-form-item>
        <el-form-item label="简介">
          <span>{{formData.computerIntroduction}}</span>
        </el-form-item>
        <el-form-item label="选择配置:" prop="computerConfig">
          <el-select v-model="formData.computerConfig">
            <el-option v-for="(one) in formCfg.configList"
                       :key="one.id"
                       :label="one.computerConfig"
                       :value="one.computerConfig">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户编号" prop="userId">
          <el-input v-model="formData.userId"></el-input>
        </el-form-item>
        <div>
          <el-button @click="show = !show" style="color: gray">忘记个人编号？点击查看</el-button>
          <div style="text-align: center">
            <transition name="id">
              <div v-show="show" class="transition-box">{{userInfo.userId}}</div>
            </transition>
          </div>
        </div>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button @click="buyStuff">购买</el-button>
        <el-button @click="onSubmit">加入购物车</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "SpecificPage",
  data(){
    return{
      formData:{
        computerId:-1,
        userId:-1,
        computerName:'',
        computerType:'',
        computerIntroduction:'',
        computerImg:'',
        computerConfig:'',
      },
      rules:{
        userId: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
      },
      show:true,
      formCfg:{
        configList:[]
      },
      searchFormData:{
        pageNow: 1,
        pageSize: 5,
        searchWord:''
      },
    }
  },
  props:{
    seeMoreDiaVisible:{
      default:false
    },
    idToShow:{
      type:Number,
      required:true
    },
  },
  methods:{
    handleCancel(){
      this.$refs["showForm"].resetFields()
      this.$emit("update:seeMoreDiaVisible",false)
      this.show=false
    },
    handleOpen(){
      this.$doGet({
        url:'/computer/selectById?computerId='+this.idToShow
      }).then(result=>{
        this.formData = result.data
      }).catch(result=>{})
      this.searchFormData.searchWord = this.idToShow
      this.$appJsonPost({
        url:'/config/selectPage',
        data: this.searchFormData
      }).then(result => {
        this.formCfg.configList = result.data
      })
      this.show=false
    },
    onSubmit() {
      this.$refs["showForm"].validate((valid)=>{
        if(!valid) return
        this.$appJsonPost({
          url:'/cart/add',
          data:this.formData
        }).then(result=>{
          this.$message.success(result.data)
          this.$refs["showForm"].resetFields()
          this.$emit("addSuccess")
          this.$emit("update:seeMoreDiaVisible",false)
        }).catch(result=>{})
      })
    },
    buyStuff(){
      this.$refs["showForm"].validate((valid)=>{
        if(!valid) return
        this.$appJsonPost({
          url:'/buy/add',
          data:this.formData
        }).then(result=>{
          this.$message.success(result.data)
          this.$refs["showForm"].resetFields()
          this.$emit("addSuccess")
          this.$emit("update:seeMoreDiaVisible",false)
        }).catch(result=>{})
      })
    }
  },
  computed:{
    ...mapGetters(["userInfo"]),
  },
}
</script>

<style scoped>
  .intro{
    height: 400px;
  }
  div .el-button{
    border: 0;
    font-size: 17px;
    color: black;
  }
</style>
