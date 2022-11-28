<template>
  <div>
    <el-dialog title="提交评价" :visible="JudgeDiaVisible"
               @open="handleOpen"
               :before-close="handleCancel"
               style="text-align: center">
      <el-form :model="formData" ref="showForm" :rules="rules">
        <el-form-item label="名称">
          <span>{{formData.computerName}}</span>
        </el-form-item>
        <el-form-item label="类型">
          <span>{{formData.computerType}}</span>
        </el-form-item>
        <el-form-item label="配置">
          <span>{{formData.computerConfig}}</span>
        </el-form-item>
        <el-form-item label="评价" prop="comment">
          <el-input style="width: 700px" v-model="formData.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button @click="Submit">提交建议</el-button>
        <el-button >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Judge",
  data(){
    return{
      formData:{
        computerId:-1,
        userId:-1,
        computerName:'',
        computerType:'',
        computerConfig:'',
        comment:''
      },
      rules:{
        comment:[
          {required: true,message:'请填写评价',trigger:'blur'}
        ]
      },
      searchFormData:{
        pageNow: 1,
        pageSize: 5,
        searchWord:''
      },
    }
  },
  props:{
    JudgeDiaVisible:{
      default:false
    },
    idToJudge:{
      type: Number,
      required: true
    }
  },
  methods:{
    handleCancel(){
      this.$emit("update:JudgeDiaVisible",false)
    },
    handleOpen(){
      this.$doGet({
        url:'/buy/selectById?id='+this.idToJudge
      }).then(result=>{
        this.formData = result.data
      }).catch(result=>{})
    },
    Submit(){
      this.$refs["showForm"].validate((valid)=>{
        if(!valid) return
        this.$appJsonPost({
          url:'/comment/add',
          data:this.formData
        }).then(result=>{
          this.$message.success(result.data)
          this.$refs["showForm"].resetFields()
          this.$emit("addSuccess")
          this.$emit("update:JudgeDiaVisible",false)
        }).catch(result=>{})
      })
    }
  }
}
</script>

<style scoped>
  .el-button{
    border: 0;
  }
</style>
