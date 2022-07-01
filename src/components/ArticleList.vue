<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容1"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
// 其实放data中也可以的 这两个变量没有必要放在data 因为只有需要写在template中，需要响应式的数据才有必要放在data中，这样做性能下降
let ele = null // 全局变量
let scrollTop = 0// 记住滚动条的位置
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  // 操作DOM的时候使用mounted
  mounted () { // 给有滚动条的pull-refresh绑定滚动事件 在滚动的时候记住最新的滚动的位置
    // 组件最终渲染成html dom元素，$el就是渲染好的根标签
    // console.log(this.$refs.pullrefresh)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () { // 在每次进入home页面的时候，把滚动条从最上面滚动到上一次记录的位置
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 三种情况
    // 1.没有登录 第一次安装号app 第一次打开的时候 只能去ajax中拿
    // 2.没有登录 但是第二次打开 有可能频道被用过编辑过或者删除过 这样的话 本地存储就有值 从本地存储拿
    // 3.登录过 直接从ajax拿
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // 若数据全部加载完毕，则直接将finished设置成true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后，将loading设置成false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('下拉刷新被触发')
      this.finished = false// 防止用户把加载更多搞结束了
      this.loading = true// 重新加载数据
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
