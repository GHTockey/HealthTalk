import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types/user";

export const useUserStore = defineStore('user', () => {
   const user_info = ref<User>(); // 用户信息
   // 设置用户
   const setUser = (user: User): void => {
      user_info.value = user
   };
   // 清除用户
   const delUser = () => {
      user_info.value = undefined
   };

   return {
      user_info,
      setUser,
      delUser
   }
}, { persist: true });