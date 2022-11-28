<template>
  <body>
    <Uheader :class="navBarFixed == true ? 'navBarWrap' :''"></Uheader>
    <div>
      <div class="left">
        <el-row>
          <el-col>
            <el-form :model="formData" :rules="rules" label-width="120px" ref="updateForm">
              <el-form-item label="编号:">
                <span>{{formData.userId}}</span>
              </el-form-item>
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="formData.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pwd">
                <el-input v-model="formData.pwd"></el-input>
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
              <el-form-item label="邮箱" prop="mailBox">
                <el-input v-model="formData.mailBox"></el-input>
              </el-form-item>
              <el-form-item label="收货地址" prop="location">
                <el-input v-model="formData.location" class="long"></el-input>
              </el-form-item>
              <el-form-item label="个人简介" prop="selfIntroduction">
                <el-input v-model="formData.selfIntroduction" class="long"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="doSubmit">提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="right">

      </div>
    </div>
    <Propose></Propose>
    <Down></Down>
  </body>
</template>

<script>
import Uheader from "@/component/Uheader";
import Propose from "@/component/Propose";
import Down from "@/component/Down";
export default {
  name: "modify",
  components:{
    Down,
    Propose,
    Uheader,
  },
  computed:{
    idToUpdate(){
      return this.$route.query.idToUpdate
    }
  },
  data(){
    return {
      navBarFixed: false,
      options:[{
        value: '男',
        label: '男'
      },{
        value: '女',
        label: '女',
      },{
        value: 'alien',
        label: 'UnKnow',
      }],
      formData:{
        userId:'',
        userName:'',
        pwd:'',
        sex:'',
        mailBox:'',
        location:'',
        selfIntroduction:''
      },
      rules:{
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
       pwd: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      formCfg:{
        userList:[]
      }
    }
  },
  methods:{
    doSubmit(){
      this.$refs["updateForm"].validate((valid) =>{
        if(!valid) return
        this.$appJsonPost({
          url:'/user/updateById',
          data:this.formData
        }).then(result =>{
          this.$message.success(result.data)
          this.$refs["updateForm"].resetFields()
          this.$router.replace('/loginmain')
        }).catch(result =>{})
      })
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop)
      if (scrollTop > 80) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    }
  },
  mounted() {
    this.$doGet({
      url:'/user/selectAll'
    }).then(result=>{
      this.formCfg.userList = result.data
      return Promise.resolve()
    }).then(result=>{
      this.$doGet({
        url:'/user/selectById?userId='+this.idToUpdate
      }).then(r=>{
        this.formData = r.data
      })
    })
    window.addEventListener("scroll", this.watchScroll);
  },
}
</script>

<style scoped>
  body{
    overflow-x: hidden;
  }
  .el-input{
    width: 320px;
  }
  .long{
    width: 700px;
  }
  .left{
    width: 820px;
    float: left;
  }
  .right{
    float: right;
    width: 550px;
    height: 500px;
  }
  Finish{
    bottom: 0;
    position: fixed;
  }
  body{
    overflow-y: auto;
    height: auto;
  }
  .navBarWrap {
    position:fixed;
    top:0;
    z-index:999;
    width: 100%;
  }
</style>
