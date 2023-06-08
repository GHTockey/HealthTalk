<script setup lang="ts">
import { mobileRules, passwordRules } from "@/utils/rules";
import navBar from "@/components/navBar.vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { showToast } from "vant";
import { loginByPwd } from "@/api/user";
import { useUserStore } from "@/stores";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const mobile = ref<string>('13230000014');
const password = ref<string>('abc12345');
const checkAgree = ref(false);

// 表单提交
async function login() {
   if (!checkAgree.value) return showToast({ 'type': 'fail', 'message': '请勾选我已同意' })
   // 验证完毕，进行登录
   let res = await loginByPwd(mobile.value, password.value);
   userStore.setUser(res.data); // 存下用户信息
   router.push((<string>route.query.returnUrl) || '/user');
   showToast({'type':'success','message':'登录成功'});
}

</script>

<template>
   <div class="login-page">
      <navBar right-text="注册" @click-right="router.push('/register')"></navBar>
      <!-- 头部 -->
      <div class="login-head">
         <h3>密码登录</h3>
         <a href="javascript:;">
            <span>短信验证码登录</span>
            <van-icon name="arrow"></van-icon>
         </a>
      </div>
      <!-- 表单 -->
      <van-form autocomplete="off" @submit="login">
         <van-field placeholder="请输入手机号" type="tel" v-model="mobile" :rules="mobileRules"></van-field>
         <van-field placeholder="请输入密码" type="password" v-model="password" :rules="passwordRules"></van-field>
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
