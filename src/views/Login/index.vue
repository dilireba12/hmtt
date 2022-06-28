<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <!--一般写法 <template v-slot='left'>
        <van-icon name="cross" />
      </template> -->
      <!-- 废弃写法 vue2支持⬇ -->
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机的格式' },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是六位' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShown"
            @finish="isCountDownShown = false"
            :time="time"
            format="ss s"
          />
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 验证码
      time: 5 * 1000, // 倒计时
      isCountDownShown: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        // res.data.data
        // token有效期2个小时 两种思路 让用户重新登录refresh_token
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShown = true// 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        // 轻提示
        this.$toast.fail('手机号格式不正确！')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang=less>
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 10px;
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
.van-count_down {
  position: fixed;
  right: 18px;
}
</style>
