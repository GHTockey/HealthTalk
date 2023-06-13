import { request } from "@/utils/request";
import type { User, CodeType, UserInfo } from "@/types/user";

/** 密码登录API */
export function loginByPwd(mobile: string, password: string) {
   return request<User>('/login/password', 'POST', { mobile, password })
};

/** 发送验证码API */
export function sendMobileCode(mobile: string, type: CodeType) {
   return request('/code', 'GET', { mobile, type })
};

/** 短信登录API */
export const loginByMobile = (mobile: string, code: string) =>
   request<User>('/login', 'POST', { mobile, code });

/** 获取个人信息API */
export function getUserInfo() {
   return request<UserInfo>('/patient/myUser', 'GET')
};