<template>
  <div>
    <el-dialog title="售后服务" :visible="AfterBuyDiaVisible"
               @open="handleOpen"
               :before-close="handleCancel">
      <el-form :model="formData" :rules="rules" label-width="120px" ref="addForm">
        <div style="text-align: center;height: 40px">商品信息</div>
        <el-form-item label="商品id:" prop="computerId">
          <span>{{formData.computerId}}</span>
        </el-form-item>
        <el-form-item label="商品名称:" prop="computerName">
          <span>{{formData.computerName}}</span>
        </el-form-item>
        <el-form-item label="商品种类:" prop="computerType">
          <span>{{formData.computerType}}</span>
        </el-form-item>
        <el-form-item label="商品配置:" prop="computerConfig">
          <span>{{formData.computerConfig}}</span>
        </el-form-item>
        <el-form-item label="选择服务:" prop="service">
          <el-select v-model="formData.service">
            <el-option
              v-for="item in ServiceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请原因" prop="apply">
          <el-input v-model="formData.apply"></el-input>
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
  name: "AfterBuy",
  data(){
    return{
      formData:{
        userId:-1,
        computerId:-1,
        computerName:'',
        computerConfig:'',
        computerType:'',
        service:'',
        apply:'',
        state:''
      },
      rules:{
        service:[
          {required: true,trigger:'blur'}
        ],
        apply:[
          {required: true,message:'请填写评价',trigger:'blur'}
        ]
      },
      ServiceOptions: [{
        value: '已收到货退款',
        label: '已收到货退款'
      }, {
        value: '未收到货退款',
        label: '未收到货退款'
      }, {
        value: '维修',
        label: '维修'
      }],
    }
  },
  props:{
    AfterBuyDiaVisible:{
      default:false
    },
    idToJudge:{
      type:Number,
      required:true
    },
  },
  methods:{
    handleCancel(){
      this.$emit("update:AfterBuyDiaVisible",false)
    },
    handleOpen(){
      this.$doGet({
        url:'/buy/selectById?id='+this.idToJudge
      }).then(result=>{
        this.formData = result.data
      }).catch(result=>{})
    },
    Submit(){
      this.formData.state = '未受理'
      this.$refs["addForm"].validate((valid)=>{
        if(!valid) return
        this.$appJsonPost({
          url:'/after/add',
          data:this.formData
        }).then(result=>{
          this.$message.success(result.data)
          this.$refs["addForm"].resetFields()
          this.$emit("addSuccess")
          this.$emit("update:AfterBuyDiaVisible",false)
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
