import { request } from "@/utils/request";
import type { User, CodeType } from "@/types/user";

/** 密码登录API */
export function loginByPwd(mobile: string, password: string) {
   return request<User>('/login/password', 'POST', { mobile, password })
};

/** 发送验证码API */
export function sendMobileCode(mobile: string, type: CodeType) {
   return request('/code', 'GET', { mobile, type })
};