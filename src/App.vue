<template>
  <div>
    <VantBtn :type="'primary'">btn</VantBtn>
    <a href="#">111</a>
  </div>
</template>

<script setup lang="ts">
import { Button as VantBtn } from "vant";

</script>

<style>
a {
  color: var(--cp-primary);
}
</style>