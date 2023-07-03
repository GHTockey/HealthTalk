import { request } from "@/utils/request";
import type {
   KnowledgeParams,
   KnowledgePage,
   DoctorPage,
   PageParams,
   FollowType,
   TopDep,
   Image
} from "@/types/consult";

/** 获取知识页文章API */
export function getKnowledgePage(params: KnowledgeParams) {
   return request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
};
/**  获取推荐医生API */
export function getDoctorPage(params: PageParams) {
   return request<DoctorPage>('/home/page/doc', 'GET', params)
};
/** 关注与取消关注API */
export function followOrUnfollow(id: string, type: FollowType = 'doc') {
   return request('/like', 'POST', { id, type })
};
/** 获取科室API */
export function getAllDep() {
   return request<TopDep[]>('/dep/all')
};
/** 图片上传API */
export function uploadImage(file: File) {
   const fd = new FormData()
   fd.append('file', file)
   return request<Image>('/upload', 'POST', fd)
};
