<template>
  <body>
    <el-dialog title="添加用户" :visible="registerDiaVisible" :before-close="handleCancel">
      <el-form :model="formData" :rules="rules" label-width="120px" ref="addForm">
        <el-form-item label="用户名:" prop="userName">
          <el-input v-model="formData.userName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pwd">
          <el-input v-model="formData.pwd" style="width: 250px"></el-input>
        </el-form-item>
        <h3 style="text-align: center">创建用户必须填写地址</h3>
        <el-form-item label="地址:" prop="location">
          <el-input v-model="formData.location"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mailBox">
          <el-input v-model="formData.mailBox"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex"
                     type="select"
                     :editable="true"
                     prefix-icon="el-icon-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="selfIntroduction">
          <el-input v-model="formData.selfIntroduction" class="long"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button @click="onSubmit">注册</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-dialog>
  </body>
</template>

<script>
export default {
  name: "Register",
  data(){
    return{
      formData:{
        userName:'',
        pwd:'',
        location:'',
        sex:'',
        mailBox:'',
        selfIntroduction:''
      },
      rules:{
        userName:[
          {required:true, message:'请输入用户名',trigger:'blur'}
        ],
        pwd:[
          {required:true, message:'请输入密码',trigger:'blur'}
        ],
        location:[
          {required:true, message:'请输入收货地址',trigger:'blur'}
        ]
      },
      options:[{
        value: '男',
        label: '男'
      },{
        value: '女',
        label: '女',
      },{
        value: 'UnKnow',
        label: '不想公开',
      }],
    }
  },
  props:{
    registerDiaVisible:{
      default:false
    }
  },
  methods:{
    handleCancel(){
      this.$refs["addForm"].resetFields()
      this.$emit("update:registerDiaVisible",false)
    },
    onSubmit(){
      this.$refs["addForm"].validate((valid) => {
        if (!valid) return
        this.$appJsonPost({
          url:'/user/register',
          data:this.formData
        }).then(result=>{
          this.$message.success(result.data)
          this.$refs["addForm"].resetFields()
          this.$emit("addSuccess")
          this.$emit("update:registerDiaVisible",false)
        }).catch(result=>{})
      })
    }
  }
}
</script>

<style scoped>

</style>
