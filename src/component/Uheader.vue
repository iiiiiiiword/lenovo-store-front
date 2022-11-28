<template>
  <body>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item><img src="../assets/title.png"></el-menu-item>
      <el-menu-item @click="ufront">首页</el-menu-item>
      <el-menu-item @click="cart">购物车</el-menu-item>
      <el-menu-item @click="record">购买记录</el-menu-item>
      <el-menu-item @click="after">查看售后处理</el-menu-item>
      <el-menu-item @click="modify">个人中心</el-menu-item>
      <div class="name">
        欢迎,<span>{{userInfo.userName}}</span>
        <el-button @click="exit" class="login">退出</el-button>
      </div>
    </el-menu>
  </body>
</template>

<script>

import {mapGetters} from "vuex";
export default {
  name: "Uheader",
  methods: {
    ufront(){
      this.$router.replace("/loginmain")
    },
    cart(){
      this.$router.replace("/cart")
      this.$router.replace({
        query:{
          idToUpdate: this.userInfo.userId
        }
      })
    },
    record(){
      this.$router.replace("/record")
      this.$router.replace({
        query:{
          idToUpdate: this.userInfo.userId
        }
      })
    },
    modify(){
      this.$router.replace('/modify')
      this.$router.replace({
        query:{
          idToUpdate: this.userInfo.userId
        }
      })
    },
    exit(){
      alert("退出成功!")
      this.$router.replace("/main")
    },
    after(){
      this.$router.replace('/after')
      this.$router.replace({
        query:{
          idToAfter: this.userInfo.userId
        }
      })
    }
  },
  computed:{
    ...mapGetters(["userInfo"])
  },
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .name{
    border: 0;
    font-style: italic;
    font-size: 14px;
    background-color: transparent;
    color: white;
    text-align: right;
    padding-top: 10px;
  }
  .login{
    border: 0;
    font-style: italic;
    font-size: 14px;
    background-color: transparent;
    color: white;
    text-align: right;
  }
  body{
    height: 55px;
    overflow-y: hidden;
  }
  img{
    width: 110px;
  }
</style>
