<template lang="pug">
div
  h1.title 웁스, 404

  p.title 찾고 있던 페이지가 존재하지 않습니다.

  v-btn(
    :to="path"
    color="primary"
    outlined
  ) 홈으로 이동
</template>

<script>
import { routerPaths } from '@constants';

export default {
  data() {
    return {
      path: routerPaths.home,
    };
  },
};
</script>

<style lang="scss">
  .title {
    margin-bottom: 12px;
  }
</style>
