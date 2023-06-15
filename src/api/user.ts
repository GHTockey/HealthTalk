import { request } from "@/utils/request";
import type { User, CodeType, UserInfo, Patient } from "@/types/user";

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
   return request<UserInfo>('/patient/myUser')
};

/** 获取患者信息列表API */
export function getPatientList() {
   return request<Patient[]>('/patient/mylist')
};

/** 添加患者信息API */
export function addPatient(patient: Patient) {
   return request('/patient/add', 'POST', patient)
};

/** 编辑患者信息API */
export function editPatient(patient: Patient) {
   return request('/patient/update', 'PUT', patient)
};

/** 删除患者信息API */
export function delPatient(id: string) {
   return request(`/patient/del/${id}`, 'DELETE')
};

