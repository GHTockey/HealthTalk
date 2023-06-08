import { request } from "@/utils/request";
import type { User } from "@/types/user";

export function loginByPwd(mobile: string, password: string) {
   return request<User>('/login/password', 'POST', { mobile, password })
};