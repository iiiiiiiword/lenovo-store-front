<template>
  <body>
    <div style="height: 60px"></div>
    <div style="text-align: center;">
      <div class="center">
        <div style="font-size: 35px;font-weight: bold;float: left"><a href="https://brand.lenovo.com.cn/new/brandnew.html">新闻中心</a></div>
        <div class="show">
          <div style="float: right">
            <div style="width: 350px; padding-bottom: 5px" >
              <p style="font-size: 30px">01<a style="font-size: 13px;padding-left: 5px" href="https://brand.lenovo.com.cn/brand/PPN01598.html">Tech World 2022｜刘军发布智能化转型框架 助力企业跨越式发展11月9日...</a></p>
            </div>
            <div style="width: 350px;padding-bottom: 5px" >
              <p style="font-size: 30px">02<a style="font-size: 13px;padding-left: 5px" href="https://brand.lenovo.com.cn/brand/PPN01525.html">夯实第二增长曲线 全面提升实体经济赋能力2022年11月03日2022年11月3日...</a></p>
            </div>
            <div style="width: 350px;padding-bottom: 5px">
              <p style="font-size: 30px">03<a style="font-size: 13px;padding-left: 5px" href="https://brand.lenovo.com.cn/brand/PPN01523.html">2分钟破亿，4小时18亿，15冠王！联想双11火爆开启，2分钟全网销售额破亿,...</a></p>
            </div>
          </div>
          <div class="container">
            <el-carousel trigger="click" height="440px" autoplay="true">
              <el-carousel-item v-for="item in photo" :key="item">
                <a :href="item.path"><img :src="item.url"></a>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div style="height: 80px"></div>
      <div style="padding-bottom: 60px">
        <div class="photo">
          <div style="font-size: 35px;font-weight: bold;float: left">联想创新科技大会</div>
          <div style="height: 70px"></div>
          <a href="https://techworld.lenovo.com.cn/pc/techworld/landing.html?origin=X165&pmf_source=H0000000496Y0000"><img src="../assets/1.png" style="width: 1200px;height: 380px" ></a>
        </div>
      </div>
      <div style="height: 80px"></div>
      <div style="padding-bottom: 60px">
        <div class="photo">
          <div style="font-size: 35px;font-weight: bold;float: left"><a href="https://brand.lenovo.com.cn/brandstory/brandbenefit.html">公益中心</a></div>
          <div class="show">
            <div style="float: left">
              <el-carousel :interval="4000" type="card" height="350px" autoplay="true" style="width: 1200px">
                <el-carousel-item v-for="item in photo1" :key="item">
                  <a :href="item.path"><img :src="item.url"></a>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "Finish",
  data(){
    return{
      photo:[
        {url:require("../assets/p1.png"),path: ("https://brand.lenovo.com.cn/brand/PPN01598.html")},
        {url:require("../assets/p2.png"),path: ("https://brand.lenovo.com.cn/brand/PPN01525.html")},
        {url:require("../assets/p3.png"),path: ("https://brand.lenovo.com.cn/brand/PPN01523.html")},
      ],
      photo1:[
        {url:require("../assets/b2.jpg"),path: ("https://brand.lenovo.com.cn/brand/PPGY00054.html")},
        {url:require("../assets/b3.jpg"),path: ("https://www.lenovofoundation.cn/newsinfo/2003660.html")},
        {url:require("../assets/b3.gif"),path: ("https://brand.lenovo.com.cn/brand/PPGY00069.html")},
      ]
    }
  },
}
</script>

<style scoped>
 li{
  text-decoration: none;
  list-style: none;
  display: inline;
  padding-left: 99px;
  text-align: center;
}
 .el-button{
   border: 0;
   background-color: transparent;
   color: black;
   text-align: center;
 }
 .down{
   background-color: rgba(0,0,0,0.1);
 }
 p{
   text-align: left;
 }
 .front{
   font-size: 20px;
   font-weight: bold;
 }
 .show{
   margin-top: 60px;
   height: 450px;
 }
 .center{
   padding-top: 40px;
   width:1000px;
   height:600px;
   display:inline-block;
 }
 img{
   height: 100%;
   width: 100%;
 }
 .el-carousel{
   width: 630px;
 }
 a{
   text-decoration: none;
   color: black;
 }
 .photo{
   display:inline-block;
 }
</style>
