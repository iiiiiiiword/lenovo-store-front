<template>
  <div style="text-align: center;">
    <div class="center">
      <span style="float: left;width: 6px;height: 28px;background-color: red"></span>
      <div style="font-size: 20px;font-style: italic;font-weight: bold;float: left">为你推荐</div>
      <div class="show">
        <div class="container">
          <el-carousel :interval="4000" type="card" height="600px" autoplay="true">
            <el-carousel-item v-for="item in photo" :key="item">
              <a :href="item.path"><img :src="item.url"></a>
              <span>{{item.describe}}</span>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Propose",
  data(){
    return{
      photo:[
        {url:require("../assets/m1.jpg"),path: ("https://item.lenovo.com.cn/product/1018191.html"),describe: ("拯救者 R9000P 2021款16英寸游戏笔记本电脑 钛晶灰")},
        {url:require("../assets/m2.jpg"),path: ("https://item.lenovo.com.cn/product/1023971.html"),describe: ("摩托罗拉 moto X30 Pro 12GB+256GB 晴霜白")},
        {url:require("../assets/m3.jpg"),path: ("https://item.lenovo.com.cn/product/1019122.html"),describe: ("拯救者 刃7000P-26AMR 分体式游戏主机")},
        {url:require("../assets/m4.jpg"),path: ("https://item.lenovo.com.cn/product/1022167.html"),describe: ("【王一博网课护眼】YOGA 27可旋转 4K一体电脑(R7 16G 1TB)水月银")},
        {url:require("../assets/m5.jpg"),path: ("https://item.lenovo.com.cn/product/1018204.html"),describe: ("拯救者 Y7000 2021 英特尔酷睿i5 15.6英寸游戏笔记本 幻影黑")},
        {url:require("../assets/m6.jpg"),path: ("https://item.lenovo.com.cn/product/1023473.html"),describe: ("笔记本深度拆机清洁（到店换散热硅脂）")},
      ]
    }
  }
}
</script>

<style scoped>
.page{
  text-align: center;
}
.center{
  padding-top: 40px;
  width:1000px;
  height:600px;
  display:inline-block;
}
.show{
  margin-top: 60px;
  height: 450px;
}
</style>
