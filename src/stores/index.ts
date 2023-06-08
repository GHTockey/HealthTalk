import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

export const pinia = createPinia().use(persist);
export * from './modules/user';