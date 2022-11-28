<template>
  <body>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 60px">
      <el-menu-item><img src="../assets/title.png"></el-menu-item>
      <el-menu-item @click="goFront">联想首页</el-menu-item>
      <el-menu-item @click="goService">服务</el-menu-item>
      <div>
        <el-button @click="comeLogin" class="login">登录</el-button>
        <el-button @click="comeRegister" class="login">注册</el-button>
      </div>
    </el-menu>
    <login :loginDiaVisible.sync="loginDiaVisible">
    </login>
    <register :registerDiaVisible.sync="registerDiaVisible">
    </register>
  </body>
</template>

<script>
import login from "@/views/user/Login";
import Register from "@/views/user/Register";

export default {
  name: "Header",
  components:{
    login,
    Register,
  },
  data() {
    return {
      loginDiaVisible: false,
      registerDiaVisible:false,
    }
  },
  methods: {
    comeLogin() {
      this.loginDiaVisible = true;
    },
    comeRegister() {
      this.registerDiaVisible = true;
    },
    goService() {
      this.$router.replace("/service")
    },
    goCommunity() {
      this.$router.replace("/community")
    },
    goFront() {
      this.$router.replace("/main")
    },
  }
}

</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .login{
    border: 0;
    font-style: italic;
    background-color: transparent;
    color: white;
    text-align: center;
  }
  .el-menu div{
    text-align: right;
    margin-top: 11px;
    margin-right: 11px;
  }
  img{
    width: 110px;
  }
</style>
