<template>
  <body>
    <div class="down">
      <ul>
        <li>
          <el-button>
            <a class="front" href="https://shop.lenovo.com.cn/help/service-provider-information.html">购物指南</a>
            <p>服务商信息</p>
            <p>购买流程</p>
            <p>注册登录</p>
            <p>商品评价</p>
          </el-button>
        </li>
        <li>
          <el-button>
            <a class="front" href="https://shop.lenovo.com.cn/help/sales-and-distribution-methods.html">配送方式</a>
            <p>配送方式</p>
            <p>配送方式信息</p>
            <p>签收原则</p>
            <p>物流查询</p>
          </el-button>
        </li>
        <li>
          <el-button>
            <a class="front" href="https://shop.lenovo.com.cn/help/payments.html">支付方式</a>
            <p>分期支付</p>
            <p>支付问题</p>
          </el-button>
        </li>
        <li>
          <el-button>
            <a class="front" href="https://shop.lenovo.com.cn/help/order-information.html">订单信息</a>
            <p>发票信息</p>
            <p>手机激活查询</p>
          </el-button>
        </li>
        <li>
          <el-button>
            <a class="front" href="https://shop.lenovo.com.cn/help/after-sales-lenovo.html">售后服务</a>
            <p>售后服务总则</p>
            <p>24小时在线客服</p>
          </el-button>
        </li>
        <li>
          <el-button>
            <a class="front" href="https://shop.lenovo.com.cn/help/service-commitment.html">其他说明</a>
            <p>服务承诺</p>
            <p>账户安全</p>
            <p>手机产品购买须知</p>
            <p>环境信息</p>
          </el-button>
        </li>
      </ul>
    </div>
  </body>
</template>

<script>
export default {
  name: "Down"
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
    text-align: left;
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
  img{
    height: 100%;
    width: 100%;
  }
  a{
    text-decoration: none;
    color: black;
  }
</style>
