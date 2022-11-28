<template>
  <body>
    <Header :class="navBarFixed == true ? 'navBarWrap' :''"></Header>

    <Down></Down>
  </body>
</template>

<script>
import Header from "@/component/Header";
import Down from "@/component/Down";
export default {
  name: "Community",
  components:{
    Down,
    Header
  },
  data(){
    return{
      navBarFixed: false,
    }
  },
  methods:{
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
    window.addEventListener("scroll", this.watchScroll);
  }
}
</script>

<style scoped>
Down{
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
