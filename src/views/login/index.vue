<script lang="ts" setup>
import CpNavBar from "@/components/CpNavBar.vue";
import { mobileRules, passwordRules, codeRules } from "@/utils/rules";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { showToast, type FormInstance } from "vant";
import { loginByPwd, sendMobileCode, loginByMobile } from "@/api/user";
import { useUserStore } from "@/stores";
import { onUnmounted } from "vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const mobile = ref<string>('13230000014');
const password = ref<string>('abc12345');
const checkAgree = ref<boolean>(true);
const isPwd = ref<boolean>(true);
const code = ref<string>('');
const time = ref<number>(0);
const form = ref<FormInstance>();
let timeId: number;

// 表单提交
async function login() {
   if (!checkAgree.value) return showToast({ 'type': 'fail', 'message': '请勾选我已同意' })
   // 验证完毕，进行登录
   let res = isPwd.value ? await loginByPwd(mobile.value, password.value) : await loginByMobile(mobile.value, code.value);
   userStore.setUser(res.data); // 存下用户信息
   router.push((<string>route.query.returnUrl) || '/user');
   showToast({ 'type': 'success', 'message': '登录成功' });
};

// 发送
async function send() {
   if (time.value > 0) return
   await form.value?.validate('mobile')
   await sendMobileCode(mobile.value, 'login')
   showToast({ 'type': 'success', 'message': '发送成功' })
   time.value = 60
   window.clearInterval(timeId)
   timeId = window.setInterval(() => {
      time.value--
      if (time.value <= 0) window.clearInterval(timeId)
   }, 1000)
};
// 组件卸载关闭定时器
onUnmounted(() => {
   window.clearInterval(timeId)
})
</script>

<template>
   <div class="login-page">
      <CpNavBar right-text="注册" @click-right="router.push('/register')"></CpNavBar>
      <!-- 头部 -->
      <div class="login-head">
         <h3>{{ isPwd ? '密码登录' : '短信验证码登录' }}</h3>
         <a href="javascript:;" @click="isPwd = !isPwd">
            <span>{{ !isPwd ? '密码登录' : '短信验证码登录' }}</span>
            <vanIcon name="arrow"></vanIcon>
         </a>
      </div>

      <!-- 表单 -->
      <van-form autocomplete="off" @submit="login" ref="form">
         <van-field placeholder="请输入手机号" name="mobile" type="tel" v-model="mobile" :rules="mobileRules"></van-field>
         <van-field v-if="isPwd" placeholder="请输入密码" type="password" v-model="password" :rules="passwordRules"></van-field>
         <van-field v-else placeholder="短信验证码" v-model="code" :rules="codeRules">
            <template #button>
               <span class="btn-send" :class="{ active: time > 0 }" @click="send">
                  {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
               </span>
            </template>
         </van-field>
         <div class="cp-cell">
            <van-checkbox v-model="checkAgree">
               <span>我已同意</span>
               <a href="javascript:;">用户协议</a>
               <span>及</span>
               <a href="javascript:;">隐私条款</a>
            </van-checkbox>
         </div>
         <div class="cp-cell">
            <van-button block round type="primary" native-type="submit">登 录</van-button>
         </div>
         <div class="cp-cell">
            <a href="javascript:;">忘记密码？</a>
         </div>
      </van-form>
      <!-- 底部 -->
      <div class="login-other">
         <van-divider>第三方登录</van-divider>
         <div class="icon">
            <img src="@/assets/qq.svg" alt="" />
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.login {
   &-page {
      padding-top: 46px;
   }

   &-head {
      display: flex;
      padding: 30px 30px 50px;
      justify-content: space-between;
      align-items: flex-end;
      line-height: 1;

      h3 {
         font-weight: normal;
         font-size: 24px;
      }

      a {
         font-size: 15px;
      }
   }

   &-other {
      margin-top: 60px;
      padding: 0 30px;

      .icon {
         display: flex;
         justify-content: center;

         img {
            width: 36px;
            height: 36px;
            padding: 4px;
         }
      }
   }
}

.van-form {
   padding: 0 14px;

   .cp-cell {
      height: 52px;
      line-height: 24px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .van-checkbox {
         a {
            color: var(--cp-primary);
            padding: 0 5px;
         }
      }
   }

   .btn-send {
      color: var(--cp-primary);

      &.active {
         color: rgba(22, 194, 163, 0.5);
      }
   }
}
</style>
