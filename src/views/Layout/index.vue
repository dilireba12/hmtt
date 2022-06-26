<template>
  <div>
    <div>
      <router-view />

      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">
          首页<i class="toutiao toutiao-shouye" slot="icon"></i>
        </van-tabbar-item>
        <van-tabbar-item replace to="/video" icon="search"
          >视频<i class="toutiao toutiao-shipin" slot="icon"></i
        ></van-tabbar-item>
        <van-tabbar-item replace to="/question" icon="home-o"
          >问答<i class="toutiao toutiao-wenda" slot="icon"></i
        ></van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="search"
          >我的<i class="toutiao toutiao-wode" slot="icon"></i
        ></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao{
  font-size: 40px;
}
/deep/ .van-tabber-item_text {
  font-size: 20px !important;
}
</style>
