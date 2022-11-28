<template>
  <div>
    <el-dialog title="详细情况" :visible="OnlySeeMoreDiaVisible"
               @open="handleOpen"
               :before-close="handleCancel"
               style="text-align: center">
      <el-form :model="formData" ref="showForm" >
        <el-form-item label="" style="text-align: center">
          <img :src="formData.computerImg">
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
        <div>若想要购买请先登录!</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "SpecificPage",
  data(){
    return{
      formData:{
        computerId:-1,
        computerName:'',
        computerType:'',
        computerIntroduction:'',
        computerImg:'',
      },
    }
  },
  props:{
    OnlySeeMoreDiaVisible:{
      default:false
    },
    idToShow:{
      type:Number,
      required:true
    }
  },
  methods:{
    handleCancel(){
      this.$refs["showForm"].resetFields()
      this.$emit("update:OnlySeeMoreDiaVisible",false)
    },
    handleOpen(){
      this.$doGet({
        url:'/computer/selectById?computerId='+this.idToShow
      }).then(result=>{
        this.formData = result.data
      }).catch(result=>{})
    },
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
  .el-form div{
    font-size: 17px;
    font-style: oblique;
  }
</style>
