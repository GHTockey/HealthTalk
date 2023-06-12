<template>
   <NavBar :title="title" left-arrow :right-text="rightText" @click-left="onClickLeft"
      @click-right="emit('clickRight')"></NavBar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar } from "vant";

defineProps<{ title?: string; rightText?: string }>();
const emit = defineEmits<{
   (e: 'clickRight'): void
}>();
const router = useRouter();

// 回退 (有上一级返回上一级 没有返回主页)
const onClickLeft = () => {
   if (window.history.state.back) {
      router.back()
   } else {
      router.push('/')
   }
}
</script>

<style lang="scss" scoped>
:deep() {
   .van-nav-bar {
      &__arrow {
         font-size: 18px;
         color: var(--cp-text1) !important;
      }

      &__text {
         font-size: 15px;
      }
   }
}
</style>