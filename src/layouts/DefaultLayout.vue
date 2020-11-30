<template lang="pug">
el-container.app-wrapper
  sidebar.sidebar-container

</template>

<script lnag="ts">
import { ref, defineComponent } from 'vue';
import { Sidebar } from './components';

export default defineComponent({
  components: defineComponent({
    Sidebar,
  }),
  setup() {
    const count = ref(0);

    return { count };
  },
});

</script>

<style lang="scss" scoped>
@import "~@styles/mixin.scss";
@import "~@styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.container {
  height: 100vh;
  border: 1px solid #eee;
  .aside {
    width: 200px;
    background-color: rgb(238, 241, 246);
  }
}

.header {
  text-align: right;
  font-size: 12px;
}

</style>
