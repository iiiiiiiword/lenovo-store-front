<template>
  <div>
    <el-dialog title="登录" :visible="loginDiaVisible" :before-close="handleCancel">
      <el-form :model="formData" :rules="rules" label-width="80px" ref="loginForm">
        <el-form-item prop="userName">
          <el-input v-model="formData.userName"
                    type="text"
                    placeholder="请输入用户名"
                    size="medium"
                    clearable>
            <template slot="prepend"><i class="el-icon-user-solid"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="formData.pwd"
                    type="password"
                    placeholder="请输入密码"
                    size="medium"
                    show-password
                    clearable>
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="in">
        <el-button size="medium" @click="submitForm">
          登录
        </el-button>
        <el-button size="medium" @click="resetForm">
          重置
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {USER_INFO_KEY, USER_TOKEN_KEY} from "@/config/constants";
import {saveItem} from "@/storage";

export default {
  name: "login",
  data(){
    return{
      formData:{
        userName:'',
        pwd:''
      },
      rules:{
        userName:[
          {required:true, message:'请输入用户名',trigger:'blur'}
        ],
        pwd:[
          {required:true, message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  props:{
    loginDiaVisible:{
      default:false
    }
  },
  methods:{
    handleCancel(){
      this.$refs["loginForm"].resetFields()
      this.$emit("update:loginDiaVisible",false)
    },
    submitForm(){
      this.$refs["loginForm"].validate((valid)=>{
        if(valid){
          this.$appJsonPost({
            url:'/user/login',
            data:this.formData
          }).then(result =>{
            alert("登陆成功")
            this.$store.dispatch("storeUserInfo",result.data)
            saveItem(USER_INFO_KEY,result.data)
            saveItem(USER_TOKEN_KEY,result.data.token)
            this.$router.replace("/loginmain")
          }).catch(err=>{})
        }else{
          alert("请输入用户名或者密码")
        }
      })
    },
    resetForm(){
      alert("重置成功!")
      this.$refs["loginForm"].resetFields()
    }
  }
}
</script>

<style scoped>
  .in{
    text-align: center;
  }
  .el-button{
    border: 0;
  }
</style>
