import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types/user";

export const useUserStore = defineStore('user', () => {
   const user = ref<User>(); // 用户信息
   // 设置用户
   const setUser = (u: User): void => {
      user.value = u
   };
   // 清除用户
   const delUser = () => {
      user.value = undefined
   };

   return {
      user,
      setUser,
      delUser
   }
}, { persist: true });